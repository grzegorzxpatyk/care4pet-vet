'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import Button from '../Button/Button';
import { FocusEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation, Variants } from 'framer-motion';

const ContainerVariants: Variants = {
  initial: {
    display: 'none',
    transition: { staggerChildren: 0.1, delay: 0.35 },
  },
  display: { display: 'block' },
  animate: {
    display: 'block',
    transition: { staggerChildren: 0.1 },
  },
};

const ButtonsVariants: Variants = {
  animate: {
    opacity: 1,
    x: '-1rem',
    y: '-1rem',
  },
  initial: {
    opacity: 0,
    x: 0,
    y: 0,
  },
};

export default function AddButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const controls = useAnimation();

  function handleClick() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (isOpen) {
      (async () => {
        await controls.start('display');
        await controls.start('animate');
      })();
    } else {
      controls.start('initial');
    }
  }, [isOpen, controls]);

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
        className='fixed bottom-8 right-8 h-16 w-16 min-w-16 rounded-full bg-blue-600/10 text-2xl'
      >
        <span className='scale-150'>
          <PlusIcon />
        </span>
      </Button>
      <motion.div
        animate={controls}
        initial='initial'
        variants={ContainerVariants}
      >
        <motion.div className='child' variants={ButtonsVariants}>
          <Link
            href='/dashboard/patients/create'
            className='absolute bottom-32 right-4'
            passHref
            tabIndex={-1}
          >
            <Button variant={'ghost'}>Patient</Button>
          </Link>
        </motion.div>
        <motion.div className='child' variants={ButtonsVariants}>
          <Link
            href='/dashboard/customers/create'
            className='absolute bottom-24 right-28'
            passHref
            tabIndex={-1}
          >
            <Button variant={'ghost'}>Customer</Button>
          </Link>
        </motion.div>
        <motion.div className='child' variants={ButtonsVariants}>
          <Link
            href='/dashboard/history/create'
            className='absolute bottom-8 right-32'
            passHref
            tabIndex={-1}
          >
            <Button variant={'ghost'}>Appointment entry</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
