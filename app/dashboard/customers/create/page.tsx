import CreateForm from '@/components/Customers/CreateForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Customer',
};

export default function Page() {
  return <CreateForm />;
}
