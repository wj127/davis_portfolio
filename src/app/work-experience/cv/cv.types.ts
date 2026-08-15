import type { Locale } from '@/i18n/config';

export type GenerateCvMarkdownParams = {
  locale: Locale;
  templatePdfBase64: string;
};

export type CvActionSuccess = {
  success: true;
  url: string;
};

export type CvActionFailure = {
  success: false;
  message: string;
};

export type CvActionResult = CvActionSuccess | CvActionFailure;

export type ResumeFactType =
  | 'achievement'
  | 'responsibility'
  | 'scope'
  | 'leadership'
  | 'technical'
  | 'business';

export type ResumeFact = {
  id: string;

  /**
   * Neutral factual statement.
   * This does NOT need to be perfectly written as a CV bullet.
   */
  statement: string;

  type: ResumeFactType;

  /**
   * Concepts that help the CV generator decide whether
   * this fact is relevant to a particular vacancy.
   */
  tags: string[];


  /**
   * 1-10: intrinsic value of this fact for a resume.
   * Job-description relevance can modify this later.
   */
  priority: number;

  /**
   * Only genuine, defensible measurements.
   */
  metrics?: Record<string, string | number>;
};

export type ResumeRole = {
  company: string;
  location?: string;

  startDate: string;
  endDate?: string;

  current?: boolean;

  /**
   * Human-readable representation of career progression.
   */
  displayTitle: string;

  /**
   * Actual historical titles.
   *
   * startDate/endDate are optional because sometimes
   * we know the progression but not the exact transition date.
   */
  titles: {
    title: string;
    startDate?: string;
    endDate?: string;
  }[];

  facts: ResumeFact[];

  technologies?: string[];
};

export type ResumeIdentity = {
  name: string;

  location: {
    cityOrRegion: string;
    country: string;
  };

  email: string;

  phone?: string;

  links?: {
    portfolio?: string;
    linkedin?: string;
    github?: string;
  };

  workAuthorization?: {
    regions: string[];
    statement: string;
  };
};

export type ResumeEducation = {
  institution: string;
  location?: string;

  degree: string;
  field?: string;

  startDate: string;
  endDate: string;

  facts?: ResumeEducationFact[];
};

export type ResumeEducationFact = {
  id: string;

  statement: string;

  tags: string[];

  priority: number;

  technologies?: string[];
  domains?: string[];
  metrics?: Record<string, string | number>;
};

export type ResumeProfile = {
  identity: ResumeIdentity;
  experience: ResumeRole[];
  education: ResumeEducation[];
};
