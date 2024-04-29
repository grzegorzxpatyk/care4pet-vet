import { fetchHealthRecords } from '@/app/lib/data';
import Button from '@/components/Button/Button';
import Link from 'next/link';

export default async function Page() {
  const healthRecords = await fetchHealthRecords();

  return (
    <div className='flex flex-col items-start justify-start gap-8'>
      <h1 className='text-4xl'>List of health records</h1>
      <table className='w-full'>
        <thead>
          <th>Date</th>
          <th>Pet</th>
          <th>Veterinarian</th>
          <th></th>
        </thead>
        <tbody>
          {healthRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.date.toDateString()}</td>
              <td>{record.patient_name}</td>
              <td>{record.vet_name}</td>
              <td>
                <Link href={`/dashboard/health-records/${record.id}`} passHref>
                  <Button variant={'ghost'}>details</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={'/dashboard/health-records/create'} passHref>
        <Button variant={'ghost'}>Create</Button>
      </Link>
    </div>
  );
}
