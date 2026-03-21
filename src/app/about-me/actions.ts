'use server';

import { z } from 'zod';
import { resend } from '@/lib/resend';
import { ContactFormEmail } from '@/app/emails/contact-form';
import type { ContactFormState } from '@/app/about-me/actions.types';

const DANGEROUS_PATTERNS = [
  /<script[\s>]/i,
  /javascript:/i,
  /on\w+\s*=/i,
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|UNION|CREATE)\b.*\b(FROM|INTO|TABLE|SET|WHERE|ALL)\b)/i,
  /(\bOR\b\s+\d+\s*=\s*\d+)/i,
  /(['";])\s*--/,
  /\{\{.*\}\}/,
  /\$\{.*\}/,
];

const toMyEmail = process.env.TO_MY_EMAIL as string;

const contactFormSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address' }),
  message: z
    .string()
    .min(10, { error: 'Message must be at least 10 characters' })
    .max(3000, { error: 'Message must be at most 3000 characters' })
    .refine((value) => !DANGEROUS_PATTERNS.some((pattern) => pattern.test(value)), {
      error: 'Message contains disallowed content',
    }),
});

function sanitize(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function sendContactEmail(_previousState: ContactFormState, formData: FormData) {
  const rawEmail = formData.get('email');
  const rawMessage = formData.get('message');

  const result = contactFormSchema.safeParse({
    email: rawEmail,
    message: rawMessage,
  });

  if (!result.success) {
    const fieldErrors: ContactFormState['fieldErrors'] = {};

    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (field === 'email' || field === 'message') {
        fieldErrors[field] = issue.message;
      }
    }

    return { success: false, fieldErrors };
  }

  const { email, message } = result.data;
  const sanitizedMessage = sanitize(message);

  const { error } = await resend.emails.send({
    from: 'contact@contact.mrdavis.me',
    to: toMyEmail,
    subject: `MrDavis.me - 💬 New contact message from ${email}`,
    replyTo: email,
    react: ContactFormEmail({
      senderEmail: email,
      message: sanitizedMessage,
    }),
  });

  if (error) {
    return {
      success: false,
      error: 'Failed to send the message. Please try again later.',
    };
  }

  return { success: true };
}
