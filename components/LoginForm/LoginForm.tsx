'use client';

import { authenticate } from '@/app/lib/actions';
import { ArrowRightIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '../Button/Button';
import { Input } from '@nextui-org/input';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form
      action={dispatch}
      className='flex w-1/3 flex-col items-start justify-start gap-4 rounded-lg border bg-zinc-100 p-8 dark:bg-zinc-950/50'
    >
      <Input
        name='email'
        label='E-mail'
        type='email'
        placeholder='john.doe@example.com'
        classNames={{ inputWrapper: 'bg-zinc-700/10' }}
        isRequired
      />
      <Input
        name='password'
        label='Password'
        type='password'
        placeholder='***** ***'
        classNames={{ inputWrapper: 'bg-zinc-700/10' }}
        isRequired
      />
      <div className='flex w-full flex-row items-center justify-between'>
        <div
          className='flex h-8 items-end space-x-1'
          aria-live='polite'
          aria-atomic='true'
        >
          {errorMessage && <ErrorMessage {...{ errorMessage }} />}
        </div>
        <LoginButton />
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      isLoading={pending}
      variant='solid'
      color='primary'
      spinnerPlacement='end'
      endContent={!pending && <ArrowRightIcon />}
    >
      Log in
    </Button>
  );
}

function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return (
    <>
      <CrossCircledIcon className='h-5 w-5 text-red-500' />
      <p className='text-sm text-red-500'>{errorMessage}</p>
    </>
  );
}
