'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import Button from '../Button/Button';
import { FocusEvent, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export default function AddButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleBlur(event: FocusEvent<HTMLButtonElement>) {
    if (event.relatedTarget !== null) return;
    setIsOpen(false);
  }

  return (
    <div className='fixed bottom-0 right-0'>
      <Button
        variant={'ghost'}
        onClick={handleClick}
        onBlur={handleBlur}
        className={clsx(
          'group fixed bottom-8 right-8 h-16 w-16 min-w-16 gap-0 rounded-full bg-blue-600/10 text-2xl transition-all',
          isOpen
            ? 'shadow-[2rem_2rem_8rem_8rem] shadow-blue-500/30'
            : 'shadow-[2rem_2rem_0_0] shadow-blue-500/0'
        )}
      >
        <span className='scale-150'>
          <PlusIcon />
        </span>
      </Button>
      <div
        className={clsx(
          'h-[50dvh] w-[50dvw] transition-all duration-300',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <Link
          href='/dashboard/patients/create'
          className='absolute bottom-32 right-6'
          passHref
        >
          <Button variant={'ghost'}>Patient</Button>
        </Link>
        <Link
          href='/dashboard/customers/create'
          className='absolute bottom-24 right-[7.5rem]'
          passHref
        >
          <Button variant={'ghost'}>Customer</Button>
        </Link>
        <Link
          href='/dashboard/history/create'
          className='absolute bottom-8 right-[8.5rem]'
          passHref
        >
          <Button variant={'ghost'}>Appointment entry</Button>
        </Link>
      </div>
    </div>
  );
}
