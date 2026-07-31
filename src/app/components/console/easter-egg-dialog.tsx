'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/dialog/dialog';
import styles from '@/app/components/console/easter-egg-dialog.module.scss';

type EasterEggDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const EasterEggDialog = ({ open, onOpenChange }: EasterEggDialogProps) => {
  const translations = useTranslations('Console.easterEgg');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.window} overlayClassName={styles.overlay}>
        <div className={styles.titleBar}>
          <DialogTitle className={styles.title}>{translations('title')}</DialogTitle>
          <DialogClose className={styles.closeButton} aria-label={translations('close')}>
            <span aria-hidden='true'>×</span>
          </DialogClose>
        </div>

        <div className={styles.body}>
          <Image
            src='/200w.gif'
            alt={translations('gifAlt')}
            width={200}
            height={150}
            unoptimized
            className={styles.gif}
          />
          <DialogDescription className={styles.message}>{translations('message')}</DialogDescription>
          <DialogClose className={styles.okButton}>{translations('ok')}</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
