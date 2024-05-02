'use client';

import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';
import { FocusEvent, useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import Button from '../NextButton/Button';

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

  function handleBlur(event: FocusEvent<Element, Element>) {
    if (event.relatedTarget !== null) return;
    setIsOpen(false);
  }

  return (
    <div className='fixed bottom-0 right-0'>
      <Button
        onClick={handleClick}
        onBlur={handleBlur}
        variant='flat'
        color='accent'
        radius='full'
        className='fixed bottom-8 right-8 h-16 w-16 min-w-16'
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
            <Button variant='light' color='accent'>
              Patient
            </Button>
          </Link>
        </motion.div>
        <motion.div className='child' variants={ButtonsVariants}>
          <Link
            href='/dashboard/customers/create'
            className='absolute bottom-24 right-28'
            passHref
            tabIndex={-1}
          >
            <Button variant='light' color='accent'>
              Customer
            </Button>
          </Link>
        </motion.div>
        <motion.div className='child' variants={ButtonsVariants}>
          <Link
            href='/dashboard/health-records/create'
            className='absolute bottom-8 right-32'
            passHref
            tabIndex={-1}
          >
            <Button variant='light' color='accent'>
              Health record
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
