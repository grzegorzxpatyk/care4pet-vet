'use client';

import { useFormStatus } from 'react-dom';
import Button, { ButtonProps } from '@/components/Button/Button';

export default function SubmitButton({
  children,
  color = 'primary',
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' color={color} {...props} isLoading={pending}>
      {children}
    </Button>
  );
}
