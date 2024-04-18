import { fetchPatients } from '@/app/lib/data';
import Button from '@/components/Button/Button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patients',
};

export default async function Page() {
  const patients = await fetchPatients();

  return (
    <div className='flex w-full select-none flex-col items-start justify-start gap-8'>
      <table className='w-full table-auto'>
        <thead className='bg-blue-800/30'>
          <tr>
            <td className='rounded-s p-2'>Name</td>
            <td>Species</td>
            <td>Age</td>
            <td>Owner</td>
            <td className='w-20 rounded-e'></td>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className='hover:bg-blue-600/10'>
              <td className='rounded-s p-2'>{patient.name}</td>
              <td>{patient.species}</td>
              <td>{patient.age}</td>
              <td>{patient.ownername}</td>
              <td className='w-20 rounded-e'>
                <Link href={`/dashboard/patients/${patient.id}`} passHref>
                  <Button variant={'ghost'} size={'sm'}>
                    edit
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
