export type ContactFormErrors = {
  email?: string[];
  message?: string[];
};

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: ContactFormErrors;
} | null;
