'use client';

import Button from '@/components/Button/Button';
import { GeistSans } from 'geist/font/sans';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body
        className={`${GeistSans.className} h-dvh w-dvw bg-zinc-200 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-100`}
      >
        <div className='flex h-full w-full flex-col items-start justify-start gap-4'>
          <h2 className='text-2xl'>Something went wrong!</h2>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
