'use client';

import { authenticate } from '@/app/lib/actions';
import { ArrowRightIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form
      action={dispatch}
      className='flex flex-col items-start justify-start gap-4 rounded-lg border bg-zinc-400 p-8 dark:bg-zinc-950/50'
    >
      <InputField name='email' label='E-mail' type='email' />
      <InputField name='password' label='Password' type='password' />
      <div className='flex w-full flex-row items-center justify-between'>
        <div
          className='flex h-8 items-end space-x-1'
          aria-live='polite'
          aria-atomic='true'
        >
          {errorMessage && (
            <>
              <CrossCircledIcon className='h-5 w-5 text-red-500' />
              <p className='text-sm text-red-500'>{errorMessage}</p>
            </>
          )}
        </div>
        <LoginButton />
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' aria-disabled={pending} disabled={pending}>
      Log in <ArrowRightIcon className='ml-2' />
    </Button>
  );
}
