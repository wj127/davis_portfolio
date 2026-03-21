type FieldErrors = {
  email?: string;
  message?: string;
};

export type ContactFormState = {
  success: boolean;
  fieldErrors?: FieldErrors;
  error?: string;
};
