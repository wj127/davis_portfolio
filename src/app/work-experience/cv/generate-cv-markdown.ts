import { getMessages, getTranslations } from 'next-intl/server';
import { anthropic } from '@/lib/anthropic';
import type { Locale } from '@/i18n/config';
import type { GenerateCvMarkdownParams } from '@/app/work-experience/cv/cv.types';
import {
  softSkillKeys,
  technicalSkills,
  type SoftSkillCategory,
  type TechnicalSkillCategory,
} from '@/app/work-experience/cv/skills';

const CV_MODEL = process.env.ANTHROPIC_CV_MODEL ?? 'claude-sonnet-4-5';
const MAX_TOKENS = 8192;

const LOCALE_LANGUAGE_NAME: Record<Locale, 'English' | 'Spanish'> = {
  en: 'English',
  es: 'Spanish',
};

// Compose a localized skills map keyed by the translated category label. Technical
// skills come straight from the language-agnostic lists; soft skills are resolved
// from their translation keys, so the CV picks up the right language automatically.
const buildLocalizedSkills = async (locale: Locale) => {
  const translations = await getTranslations({ locale, namespace: 'Skills' });
  const localizedSkills: Record<string, readonly string[]> = {};

  (Object.keys(technicalSkills) as TechnicalSkillCategory[]).forEach((category) => {
    localizedSkills[translations(`categories.${category}`)] = technicalSkills[category];
  });

  (Object.keys(softSkillKeys) as SoftSkillCategory[]).forEach((category) => {
    localizedSkills[translations(`categories.${category}`)] = softSkillKeys[category].map((skillKey) =>
      translations(`soft.${skillKey}`),
    );
  });

  return localizedSkills;
};

// Pull only the namespaces that describe the professional profile so Claude works
// from the same source of truth the site renders, already maintained per locale.
const buildSourceContent = async (locale: Locale) => {
  const messages = await getMessages({ locale });
  const skills = await buildLocalizedSkills(locale);
  const relevantContent = {
    WorkExperience: messages.WorkExperience,
    Skills: skills,
    AboutMe: messages.AboutMe,
  };

  return JSON.stringify(relevantContent, null, 2);
};

const buildInstructions = (locale: Locale, sourceContent: string) => {
  const languageName = LOCALE_LANGUAGE_NAME[locale];

  return [
    'You are generating a professional ATS-friendly CV/resume in Markdown format.',
    '',
    `Write the entire CV in ${languageName}.`,
    '',
    'The attached PDF is a template CV. Replicate its overall structure, section ordering, tone and level of detail as closely as Markdown allows (headings, contact/summary block, experience entries, skills, etc.). Do not copy its personal data verbatim, except for the name and contact information; use it only as a layout and style reference.',
    '',
    'Use the following JSON as the single source of truth for the actual content (work experience, skills and about-me sections). Translate/adapt it faithfully into the CV structure. Do not invent facts that are not supported by this data:',
    '',
    sourceContent,
    '',
    'Output requirements:',
    '- Return ONLY the Markdown document, with no surrounding explanation, preamble, or code fences.',
    '- Use standard Markdown: # / ## / ### headings, paragraphs, and - bullet lists.',
    '- Include a dedicated Skills section that keeps the grouping from the "Skills" JSON: one subheading per category, listing that category\'s skills. Preserve the provided category labels and skill names verbatim (do not translate the technical skill names).',
    '- Keep it clean and ATS-friendly.',
  ].join('\n');
};

export const generateCvMarkdown = async ({ locale, templatePdfBase64 }: GenerateCvMarkdownParams) => {
  const sourceContent = await buildSourceContent(locale);
  const instructions = buildInstructions(locale, sourceContent);

  const message = await anthropic.messages.create({
    model: CV_MODEL,
    max_tokens: MAX_TOKENS,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'document',
            source: {
              type: 'base64',
              media_type: 'application/pdf',
              data: templatePdfBase64,
            },
          },
          {
            type: 'text',
            text: instructions,
          },
        ],
      },
    ],
  });

  const markdown = message.content
    .map((block) => (block.type === 'text' ? block.text : ''))
    .join('\n')
    .trim();

  if (!markdown) {
    throw new Error('Claude returned an empty CV document.');
  }

  return markdown;
};
