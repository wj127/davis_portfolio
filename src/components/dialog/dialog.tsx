'use client';

import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';

type DialogProps = RadixDialog.DialogProps;

type DialogTriggerProps = ComponentPropsWithoutRef<typeof RadixDialog.Trigger>;

type DialogOverlayProps = ComponentPropsWithoutRef<typeof RadixDialog.Overlay>;

type DialogContentProps = ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
  overlayClassName?: string;
  overlayStyle?: CSSProperties;
};

type DialogCloseProps = ComponentPropsWithoutRef<typeof RadixDialog.Close>;

type DialogTitleProps = ComponentPropsWithoutRef<typeof RadixDialog.Title>;

type DialogDescriptionProps = ComponentPropsWithoutRef<typeof RadixDialog.Description>;

const Dialog = ({ children, ...props }: DialogProps) => <RadixDialog.Root {...props}>{children}</RadixDialog.Root>;

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(({ children, ...props }, forwardedRef) => (
  <RadixDialog.Trigger ref={forwardedRef} {...props}>
    {children}
  </RadixDialog.Trigger>
));
DialogTrigger.displayName = 'DialogTrigger';

const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(({ ...props }, forwardedRef) => (
  <RadixDialog.Overlay ref={forwardedRef} {...props} />
));
DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, overlayClassName, overlayStyle, ...props }, forwardedRef) => (
    <RadixDialog.Portal>
      <DialogOverlay className={overlayClassName} style={overlayStyle} />
      <RadixDialog.Content ref={forwardedRef} {...props}>
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  ),
);
DialogContent.displayName = 'DialogContent';

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(({ children, ...props }, forwardedRef) => (
  <RadixDialog.Close ref={forwardedRef} {...props}>
    {children}
  </RadixDialog.Close>
));
DialogClose.displayName = 'DialogClose';

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(({ children, ...props }, forwardedRef) => (
  <RadixDialog.Title ref={forwardedRef} {...props}>
    {children}
  </RadixDialog.Title>
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ children, ...props }, forwardedRef) => (
    <RadixDialog.Description ref={forwardedRef} {...props}>
      {children}
    </RadixDialog.Description>
  ),
);
DialogDescription.displayName = 'DialogDescription';

export { Dialog, DialogTrigger, DialogOverlay, DialogContent, DialogClose, DialogTitle, DialogDescription };

export type {
  DialogProps,
  DialogTriggerProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogCloseProps,
  DialogTitleProps,
  DialogDescriptionProps,
};
