import { createPatient } from '@/app/lib/actions';
import { fetchCustomersIdAndName } from '@/app/lib/data';
import { Species } from '@/app/lib/types';
import InputField from '@/components/InputField/InputField';
import Select from '@/components/Select/Select';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Patient',
};

export default async function Page() {
  const spieciesFormatted = Object.values(Species).map((element) => ({
    label: element,
    value: `${element.slice(0, 1).toUpperCase()}${element.slice(1)}`,
  }));
  const customers = await fetchCustomersIdAndName();
  const customersFormatted = customers.map((element) => ({
    label: element.name,
    value: element.id,
  }));

  return (
    <form
      action={createPatient}
      className='flex w-64 min-w-fit flex-col items-start justify-start gap-4'
    >
      <InputField name='name' label='Patient Name' type='text' />
      <InputField name='age' label='Age' type='number' min={0} max={99} />
      <Select
        name='species'
        label='Species'
        placeholder='Select patient species'
        values={spieciesFormatted}
      />
      <InputField name='isMicrochipped' label='Microchip' type='checkbox' />
      <InputField name='microchipNumber' label='Microchip No' type='number' />
      <Select
        name='ownerId'
        label='Owner'
        placeholder="Select patient's owner"
        values={customersFormatted}
      />
      <SubmitButton>Create</SubmitButton>
    </form>
  );
}
