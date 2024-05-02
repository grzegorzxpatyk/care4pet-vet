'use client';

import Button from '@/components/NextButton/Button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-start justify-start gap-4'>
      <h2 className='text-2xl'>Something went wrong!</h2>
      <Button color='primary' onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
