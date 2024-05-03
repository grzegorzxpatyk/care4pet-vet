import { fetchCustomers } from '@/app/lib/data';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <div className='flex w-full select-none flex-col items-start justify-start gap-8'>
      <table className='w-full table-auto'>
        <thead className='bg-blue-800/30'>
          <tr>
            <td className='rounded-s p-2'>Name</td>
            <td>Email</td>
            <td>Phone number</td>
            <td className='w-20 rounded-e'></td>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className='hover:bg-blue-600/10'>
              <td className='rounded-s p-2'>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phonenumber}</td>
              <td className='w-20 rounded-e'>
                <Link
                  href={`/dashboard/customers/${customer.id}/edit`}
                  passHref
                >
                  <Button variant='flat' color='accent' size='sm'>
                    edit
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={'/dashboard/customers/create'}>
        <Button variant='flat' color='accent' type='button'>
          Create customer
        </Button>
      </Link>
    </div>
  );
}
