import Link from 'next/link';
import Button from '@/components/Button/Button';
import AppLogo from '@/components/AppLogo/AppLogo';

export default function Home() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center gap-8'>
      <AppLogo size='lg' />
      <Link href={'/dashboard'}>
        <Button>Dashboard</Button>
      </Link>
    </main>
  );
}
