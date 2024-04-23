import Button from '../Button/Button';
import { signOut } from '@/auth';
import NavLinks from '../NavLinks/NavLinks';

export default function Navigation() {
  return (
    <nav className='flex h-full w-full flex-col items-center justify-between'>
      <NavLinks />
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
        className='w-full'
      >
        <Button variant={'secondary'} className='w-full'>
          Sign Out
        </Button>
      </form>
    </nav>
  );
}
