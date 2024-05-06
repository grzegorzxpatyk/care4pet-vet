'use client';

import { extendVariants, Button as NextUIButton } from '@nextui-org/react';

const Button = extendVariants(NextUIButton, {
  variants: {
    color: {
      primary:
        'font-semibold bg-zinc-900 text-zinc-200 hover:enabled:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:enabled:bg-zinc-300 disabled:text-zinc-400 dark:disabled:text-zinc-700',
      secondary:
        'font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 hover:enabled:bg-zinc-300 dark:hover:enabled:bg-zinc-800 dark:disabled:text-zinc-400 disabled:text-zinc-700',
      accent: 'font-semibold bg-blue-800/10 hover:bg-blue-800/30 text-blue-700',
    },
  },
  defaultVariants: {
    color: 'primary',
    radius: 'sm',
  },
});

export default Button;
