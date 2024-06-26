import Button from '@/components/Button/Button';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - not found',
};

export default function NotFound() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <h2 className='text-4xl'>404 - Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href='/'>
        <Button color='primary'>Return Home</Button>
      </Link>
    </div>
  );
}
