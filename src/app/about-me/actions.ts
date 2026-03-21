'use server';

import { z } from 'zod';
import { resend } from '@/lib/resend';
import ContactFormEmail from '@/app/emails/contact-form';
import type { ContactFormErrors, ContactFormState } from '@/app/about-me/actions.types';

const DANGEROUS_PATTERNS = [
  /<script\b/i,
  /javascript\s*:/i,
  /on\w+\s*=/i,
  /(<iframe|<object|<embed|<form\b)/i,
  /\bdata\s*:/i,
];

const contactFormSchema = z.object({
  email: z.email(),
  message: z.string().min(10).max(2000),
});

function containsDangerousContent(value: string): boolean {
  return DANGEROUS_PATTERNS.some((pattern) => pattern.test(value));
}

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim();
}

export async function sendContactEmail(_previousState: ContactFormState, formData: FormData) {
  const rawData = {
    email: formData.get('email')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
  };

  const validationResult = contactFormSchema.safeParse(rawData);

  if (!validationResult.success) {
    const fieldErrors: ContactFormErrors = {};

    for (const issue of validationResult.error.issues) {
      const fieldName = String(issue.path[0]) as keyof ContactFormErrors;
      const existingErrors = fieldErrors[fieldName] ?? [];
      existingErrors.push(issue.message);
      fieldErrors[fieldName] = existingErrors;
    }

    return {
      success: false,
      message: 'Validation failed',
      errors: fieldErrors,
    };
  }

  const { email, message } = validationResult.data;

  if (containsDangerousContent(message)) {
    return {
      success: false,
      message: 'Validation failed',
      errors: { message: ['Message contains potentially unsafe content'] },
    };
  }

  const sanitizedMessage = stripHtmlTags(message);

  try {
    const { error } = await resend.emails.send({
      from: 'contact@contact.mrdavis.me',
      to: process.env.TO_MY_EMAIL!,
      subject: `MrDavis.me - 💬 New contact from ${email}`,
      react: ContactFormEmail({
        senderEmail: email,
        message: sanitizedMessage,
      }),
    });

    if (error) {
      return {
        success: false,
        message: 'Failed to send message. Please try again.',
      };
    }

    return {
      success: true,
      message: 'Message sent successfully!',
    };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
