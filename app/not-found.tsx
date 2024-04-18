import Button from '@/components/Button/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <h2 className='text-4xl'>404 - Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href='/'>
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
