import { fetchCustomersIdAndName } from '@/app/lib/data';
import { Species } from '@/app/lib/types';
import CreateForm from '@/components/Patients/CreateForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Patient',
};

export default async function Page() {
  const speciesFormatted = Object.values(Species).map((element) => ({
    label: element,
    value: `${element.slice(0, 1).toUpperCase()}${element.slice(1)}`,
  }));
  const customers = await fetchCustomersIdAndName();
  const customersFormatted = customers.map((element) => ({
    label: element.name,
    value: element.id,
  }));

  return (
    <CreateForm species={speciesFormatted} customers={customersFormatted} />
  );
}
