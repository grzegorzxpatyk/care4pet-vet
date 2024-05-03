'use client';

import { useFormStatus } from 'react-dom';
import Button from '@/components/Button/Button';
import { ButtonProps } from '@nextui-org/button';

export default function SubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' {...props} color='primary' isLoading={pending}>
      {children}
    </Button>
  );
}
