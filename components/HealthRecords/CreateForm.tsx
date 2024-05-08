'use client';

import { createHealthRecord } from '@/app/lib/actions';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
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
  const [selectedPatient, setPatient] = useState('');

  function handleSelectionChange(value: Key | null) {
    if (value === null || typeof value !== 'string') {
      console.error(
        'provided value to onSelectionChange event handler has incorrect type. Check implementation for details.'
      );
      return;
    }
    setPatient(value);
  }

  function handleInputChange(value: Key | null) {
    if (value === null) {
      console.error(
        'provided value to onInputChange event handler has incorrect type. Check implementation for details.'
      );
      return;
    }
    if (value === '') setPatient('');
  }

  return (
    <form
      action={createHealthRecord}
      className='flex h-full w-full flex-col items-start justify-start gap-4'
    >
      <Input
        isReadOnly
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
        readOnly
        name='vet_id'
        label='Veterinarian ID'
        value={userId}
        classNames={{ base: 'hidden' }}
      />
      <Autocomplete
        name='pet_name'
        label='Patient'
        placeholder="Start typing patient's name"
        onSelectionChange={handleSelectionChange}
        onInputChange={handleInputChange}
        isRequired
      >
        {patients.map((item) => (
          <AutocompleteItem key={item.value} value={item.value}>
            {item.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Input
        hidden
        aria-hidden
        isReadOnly
        readOnly
        name='pet_id'
        value={selectedPatient}
        classNames={{ base: 'hidden' }}
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
