'use client';
import { useFormStatus } from 'react-dom';
import Button, { ButtonProps } from '../Button/Button';

export default function SubmitButton({
  children,
  ...props
}: Omit<ButtonProps, 'type'>) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' {...props} aria-disabled={pending} disabled={pending}>
      {children}
    </Button>
  );
}
