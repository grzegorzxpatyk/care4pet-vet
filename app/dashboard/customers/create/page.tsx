import { createCustomer } from '@/app/lib/actions';
import CreateForm from '@/components/Customers/CreateForm';
import InputField from '@/components/InputField/InputField';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Customer',
};

export default function Page() {
  return <CreateForm />;
}
