// Technical skills are proper nouns (languages, frameworks, tools) that read the same
// in every locale, so they live here once and are never translated. Only the category
// labels and the soft-skill phrases are localized, via the `Skills` message namespace.
export const technicalSkills = {
  frontEnd: [
    'JavaScript',
    'Angular',
    'CSS',
    'HTML',
    'React',
    'Django',
    'RxJS',
    'Styled-Components',
    'RTK Query',
    'NextJS',
    'SASS',
    'Puppeteer',
    'React Testing Library',
    'Jest',
  ],
  backEnd: [
    'Python',
    'Node.js',
    'Java',
    'C++',
    'C',
    'Scrapy',
    'MySQL',
    'PostgreSQL',
    'Flask',
    'MongoDB',
    'Express.js',
    'NestJS',
    'Go',
    'Mongoose',
    'Jest',
    'Bun',
    'Redis',
  ],
  mobile: ['Flutter'],
  toolsAndTechnologies: [
    'Git',
    'GitHub',
    'GitHub Actions',
    'CircleCI',
    'AWS',
    'Vercel',
    'Docker',
    'Linux',
    'Unix',
    'Jira',
    'Notion',
    'n8n',
    'OpenAI',
    'Claude',
    'Agile',
  ],
} as const;

// Soft skills are stored as translation keys; their localized text lives under
// `Skills.soft.*` in the message catalogs.
export const softSkillKeys = {
  leadershipAndManagement: [
    'teamLeadership',
    'technicalMentorship',
    'hiringAndInterviewing',
    'stakeholderManagement',
    'budgetForecasting',
  ],
  productAndStrategy: [
    'technicalRoadmap',
    'productDifferentiation',
    'techStackDecisions',
    'infrastructureArchitecture',
    'legacyMigration',
    'aiIntegration',
  ],
  businessAndClientFacing: [
    'businessModelDesign',
    'preSalesSupport',
    'publicSectorRelations',
    'partnershipDevelopment',
  ],
} as const;

export type TechnicalSkillCategory = keyof typeof technicalSkills;
export type SoftSkillCategory = keyof typeof softSkillKeys;
