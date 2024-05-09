'use client';

import { createHealthRecord } from '@/app/lib/actions';
import Autocomplete from '../Autocomplete/Autocomplete';
import { Input, Textarea } from '@nextui-org/input';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Key, useState } from 'react';

export default function CreateForm({
  fullName,
  userId,
  patients,
}: {
  fullName: string;
  userId: string;
  patients: Array<{ label: string; value: string; description: string }>;
}) {
  return (
    <form
      action={createHealthRecord}
      className='flex h-full w-full flex-col items-start justify-start gap-4'
    >
      <Input
        isDisabled
        name='vetName'
        label='Veterinarian'
        type='text'
        value={fullName}
      />
      <Input
        hidden
        aria-hidden
        isReadOnly
        isRequired
        name='vet_id'
        label='Veterinarian ID'
        value={userId}
        classNames={{ base: 'hidden' }}
      />
      <Autocomplete
        name='pet_id'
        label='Patient'
        placeholder="Start typing patient's name"
        collection={patients}
        isRequired
      />
      <Textarea
        name='description'
        label='Appointment description'
        rows={5}
        placeholder='Place your notes here...'
        isMultiline
        isRequired
      />
      <SubmitButton>Create</SubmitButton>
    </form>
  );
}
