'use client';

import type { CSSProperties, ReactElement } from 'react';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { X, ShieldCheck, Send } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog/dialog';
import { sendContactEmail } from '@/app/about-me/actions';
import type { ContactFormState } from '@/app/about-me/actions.types';
import styles from '@/app/about-me/contact-dialog/contact-dialog.module.scss';

type ContactDialogProps = {
  trigger: ReactElement;
  colors: {
    gradientColor1: string;
    gradientColor2: string;
  };
};

const ContactFormContent = ({ colors }: { colors: ContactDialogProps['colors'] }) => {
  const translations = useTranslations('ContactForm');
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(sendContactEmail, null);

  if (state?.success) {
    return (
      <div className={styles.successMessage}>
        <ShieldCheck size={32} />
        <p>{translations('successMessage')}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor='contact-email'>
          {translations('emailLabel')}
        </label>
        <input
          id='contact-email'
          name='email'
          type='email'
          placeholder={translations('emailPlaceholder')}
          className={styles.input}
          required
        />
        {state?.errors?.email && <span className={styles.error}>{state.errors.email[0]}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='contact-message'>
          {translations('messageLabel')}
        </label>
        <textarea
          id='contact-message'
          name='message'
          placeholder={translations('messagePlaceholder')}
          className={styles.textarea}
          rows={4}
          maxLength={2000}
          required
        />
        {state?.errors?.message && <span className={styles.error}>{state.errors.message[0]}</span>}
      </div>

      {state && !state.success && !state.errors && <span className={styles.error}>{state.message}</span>}

      <div className={styles.footer}>
        <div className={styles.encryptionBadge}>
          <ShieldCheck size={14} />
          <span>{translations('securityNote')}</span>
        </div>
        <button
          type='submit'
          className={styles.submitButton}
          disabled={isPending}
          style={
            {
              '--gradient-color-1': colors.gradientColor1,
              '--gradient-color-2': colors.gradientColor2,
            } as CSSProperties
          }
        >
          <span>{isPending ? translations('sending') : translations('submit')}</span>
          <Send size={14} />
        </button>
      </div>
    </form>
  );
};

export const ContactDialog = ({ trigger, colors }: ContactDialogProps) => {
  const translations = useTranslations('ContactForm');

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={styles.content}
        overlayClassName={styles.overlay}
        style={
          {
            '--gradient-color-2': colors.gradientColor2,
          } as CSSProperties
        }
      >
        <div
          className={styles.accentBar}
          style={
            {
              '--gradient-color-1': colors.gradientColor1,
              '--gradient-color-2': colors.gradientColor2,
            } as CSSProperties
          }
        />
        <div className={styles.body}>
          <div className={styles.header}>
            <div>
              <DialogTitle className={styles.title}>{translations('title')}</DialogTitle>
              <DialogDescription className={styles.subtitle}>{translations('subtitle')}</DialogDescription>
            </div>
            <DialogClose className={styles.closeButton}>
              <X size={20} />
            </DialogClose>
          </div>
          <ContactFormContent colors={colors} />
        </div>
        <div className={styles.statusBar}>
          <span>{translations('statusLeft')}</span>
          <span>{translations('statusRight')}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
