import Button from '@/components/Button/Button';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - not found',
};

export default function NotFound() {
  return (
    <div className='flex flex-col items-start justify-start gap-2'>
      <h2 className='text-2xl'>Not Found</h2>
      <p className='mb-2'>Could not find requested resource</p>
      <Link href='/dashboard' passHref>
        <Button color='primary'>Return to Dashboard</Button>
      </Link>
    </div>
  );
}
