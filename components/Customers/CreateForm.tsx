'use client';

import { createCustomer } from '@/app/lib/actions';
import { Input } from '@nextui-org/input';
import SubmitButton from '../SubmitButton/SubmitButton';

export default function CreateForm() {
  return (
    <form
      action={createCustomer}
      className='flex w-64 min-w-fit flex-col items-start justify-start gap-4'
    >
      <Input name='name' label='Full Name' type='text' />
      <Input name='email' label='Email' type='email' />
      <Input name='phoneNumber' label='Phone number' type='tel' />

      <SubmitButton>Create</SubmitButton>
    </form>
  );
}
