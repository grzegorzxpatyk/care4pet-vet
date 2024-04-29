import { fetchHealthRecords } from '@/app/lib/data';
import Button from '@/components/Button/Button';
import Link from 'next/link';

export default async function Page() {
  const healthRecords = await fetchHealthRecords();

  return (
    <div className='flex flex-col items-start justify-start gap-8'>
      <h1 className='text-4xl'>List of health records</h1>
      <table className='w-full'>
        <thead className='flex w-full flex-row justify-between'>
          <th>date</th>
          <th>pet_id</th>
          <th>vet_id</th>
          <th></th>
        </thead>
        <tbody className='w-full'>
          {healthRecords.map((record) => (
            <tr
              className='flex w-full flex-row justify-between'
              key={record.id}
            >
              <td>{record.date.toDateString()}</td>
              <td>{record.pet_id}</td>
              <td>{record.vet_id}</td>
              <td>
                <Link href={`/dashboard/health-record/${record.id}`} passHref>
                  <Button variant={'ghost'}>details</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={'/dashboard/health-record/create'} passHref>
        <Button variant={'ghost'}>Create</Button>
      </Link>
    </div>
  );
}
