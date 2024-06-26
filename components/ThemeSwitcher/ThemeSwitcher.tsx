'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import {
  DesktopIcon,
  Half2Icon,
  MoonIcon,
  SunIcon,
} from '@radix-ui/react-icons';
import { isThemeString } from '@/app/lib/utils';
import type { PressEvent } from '@react-types/shared';
import { motion } from 'framer-motion';
import { useThemeSwitcherAnimation } from './useThemeSwitcher';
import { Tooltip } from '@nextui-org/tooltip';
import { ThemeSwitcherSkeleton } from '../Skeletons/Skeletons';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const scope = useThemeSwitcherAnimation(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <ThemeSwitcherSkeleton />;

  function handlePress(event: PressEvent) {
    const selectedTheme = event.target.getAttribute('data-value');

    if (!selectedTheme) throw new TypeError('selectedTheme is null');
    if (!isThemeString(selectedTheme)) {
      throw new TypeError(`selectedTheme value is incorrect: ${selectedTheme}`);
    }

    setTheme(selectedTheme);
  }

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div ref={scope}>
      <motion.div className='theme-switch flex flex-row gap-2 rounded p-2'>
        <motion.div
          className='child'
          initial={{
            display: 'none',
            visibility: 'hidden',
            opacity: 0,
            x: 144,
          }}
        >
          <Tooltip content='Light'>
            <Button
              type='button'
              variant='light'
              color={theme === 'light' ? 'accent' : 'default'}
              data-value='light'
              onPress={handlePress}
              isIconOnly
            >
              <SunIcon />
            </Button>
          </Tooltip>
        </motion.div>
        <motion.div
          className='child'
          initial={{ display: 'none', visibility: 'hidden', opacity: 0, x: 96 }}
        >
          <Tooltip content='Dark'>
            <Button
              type='button'
              variant='light'
              color={theme === 'dark' ? 'accent' : 'default'}
              data-value='dark'
              onPress={handlePress}
              isIconOnly
            >
              <MoonIcon />
            </Button>
          </Tooltip>
        </motion.div>
        <motion.div
          className='child'
          initial={{ display: 'none', visibility: 'hidden', opacity: 0, x: 48 }}
        >
          <Tooltip content='System'>
            <Button
              type='button'
              variant='light'
              color={theme === 'system' ? 'accent' : 'default'}
              data-value='system'
              onPress={handlePress}
              isIconOnly
            >
              <DesktopIcon />
            </Button>
          </Tooltip>
        </motion.div>
        <Tooltip content={isOpen ? 'Minimize' : 'Switch theme'}>
          <Button
            type='button'
            variant='shadow'
            color='accent'
            onPress={toggleOpen}
            isIconOnly
          >
            <Half2Icon />
          </Button>
        </Tooltip>
      </motion.div>
    </div>
  );
}
