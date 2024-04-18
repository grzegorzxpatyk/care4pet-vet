import Link from 'next/link';
import Button from '@/components/Button/Button';

export default function Home() {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center gap-8'>
      <h1 className='text-6xl font-semibold'>Hello world!</h1>
      <Link href={'/dashboard'}>
        <Button>Dashboard</Button>
      </Link>
    </main>
  );
}
