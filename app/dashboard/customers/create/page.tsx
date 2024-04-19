import createCustomer from '@/app/lib/actions';
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
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
      <InputField name='name' label='Full Name' type='text' />
      <InputField name='email' label='Email' type='email' />
      <InputField name='phoneNumber' label='Phone number' type='tel' />

      <Button type='submit'>Create</Button>
    </form>
  );
}
