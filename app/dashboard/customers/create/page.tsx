import createCustomer from '@/app/lib/actions';
import Button from '@/components/Button/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Customer',
};

export default function Page() {
  return (
    <form
      action={createCustomer}
      className='flex w-64 min-w-fit flex-col items-start justify-start gap-4'
    >
      <div className='flex w-full flex-row items-center justify-between gap-4'>
        <label htmlFor='name'>Full name</label>
        <input
          type='text'
          name='name'
          id='name'
          className='rounded bg-zinc-400/50 p-2'
        />
      </div>
      <div className='flex w-full flex-row items-center justify-between gap-4'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          className='rounded bg-zinc-400/50 p-2'
        />
      </div>
      <div className='flex w-full flex-row items-center justify-between gap-4'>
        <label htmlFor='phoneNumber'>Phone number</label>
        <input
          type='tel'
          name='phoneNumber'
          id='phoneNumber'
          className='rounded bg-zinc-400/50 p-2'
        />
      </div>
      <Button type='submit'>Create</Button>
    </form>
  );
}
