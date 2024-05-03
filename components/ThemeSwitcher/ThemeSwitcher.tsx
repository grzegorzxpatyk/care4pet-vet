'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { isThemeString } from '@/app/lib/utils';
import type { PressEvent } from '@react-types/shared';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function handlePress(event: PressEvent) {
    const selectedTheme = event.target.getAttribute('data-value');

    if (!selectedTheme) throw new TypeError('selectedTheme is null');
    if (!isThemeString(selectedTheme)) {
      throw new TypeError(`selectedTheme value is incorrect: ${selectedTheme}`);
    }

    setTheme(selectedTheme);
  }

  return (
    <div className='flex flex-row gap-1'>
      <Button
        type='button'
        variant={theme === 'light' ? 'flat' : 'light'}
        isIconOnly
        data-value='light'
        onPress={handlePress}
      >
        <SunIcon />
      </Button>
      <Button
        type='button'
        variant={theme === 'dark' ? 'flat' : 'light'}
        isIconOnly
        data-value='dark'
        onPress={handlePress}
      >
        <MoonIcon />
      </Button>
      <Button
        type='button'
        variant={theme === 'system' ? 'flat' : 'light'}
        isIconOnly
        data-value='system'
        onPress={handlePress}
      >
        <DesktopIcon />
      </Button>
    </div>
  );
}
