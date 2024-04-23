'use client';

import AppLogo from '@/components/AppLogo/AppLogo';
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/actions';
import { ArrowRightIcon, CrossCircledIcon } from '@radix-ui/react-icons';

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className='flex h-full w-full flex-col items-center justify-center gap-8'>
      <AppLogo size='lg' />
      <form
        action={dispatch}
        className='flex flex-col items-start justify-start gap-4 rounded-lg border bg-zinc-400 p-8 dark:bg-zinc-950/50'
      >
        <InputField name='email' label='E-mail' type='email' />
        <InputField name='password' label='Password' type='password' />
        <LoginButton />
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
      </form>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' className='mt-4 self-end' aria-disabled={pending}>
      Log in <ArrowRightIcon className='ml-2' />
    </Button>
  );
}
