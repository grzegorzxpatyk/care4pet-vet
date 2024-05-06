import { signOut } from '@/auth';
import NavLinks from '../NavLinks/NavLinks';
import SubmitButton from '../SubmitButton/SubmitButton';

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
        <SubmitButton variant='light' color='accent' className='w-full'>
          Sign Out
        </SubmitButton>
      </form>
    </nav>
  );
}
