'use client';

import { createPatient } from '@/app/lib/actions';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Input } from '@nextui-org/input';
import { Checkbox } from '@nextui-org/checkbox';
import Autocomplete from '../Autocomplete/Autocomplete';
import { ChangeEvent, useState } from 'react';

export default function CreateForm({
  species,
  customers,
}: {
  species: Array<{ label: string; value: string }>;
  customers: Array<{ label: string; value: string }>;
}) {
  const [isMicrochipped, setIsMicrochipped] = useState(false);
  const [microchipNumber, setMicrochipNumber] = useState<number>();

  function handleIsMicrochippedChange(event: ChangeEvent<HTMLInputElement>) {
    setIsMicrochipped(event.target.checked);
  }

  return (
    <form
      action={createPatient}
      className='flex w-64 min-w-fit flex-col items-start justify-start gap-4'
    >
      <Input name='name' label='Patient Name' type='text' isRequired />
      <Input name='age' label='Age' type='number' min={0} max={99} isRequired />
      <Autocomplete
        name='species'
        label='Species'
        placeholder='Select patient species'
        collection={species}
        isRequired
      />
      <Checkbox
        name='isMicrochipped'
        isSelected={isMicrochipped}
        onChange={handleIsMicrochippedChange}
      >
        Microchip
      </Checkbox>
      <Input
        name='microchipNumber'
        label='Microchip No'
        type='number'
        isDisabled={!isMicrochipped}
        isRequired={isMicrochipped}
        value={microchipNumber?.toString()}
        onChange={(e) => setMicrochipNumber(Number(e.target.value))}
      />
      <Autocomplete
        name='ownerId'
        label='Owner'
        placeholder="Select patient's owner"
        collection={customers}
        isRequired
      />
      <SubmitButton>Create</SubmitButton>
    </form>
  );
}
