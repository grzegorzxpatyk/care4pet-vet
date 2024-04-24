import { fetchCustomer, fetchPatient } from '@/app/lib/data';
import { UUID } from '@/app/lib/types';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: UUID } }) {
  const id = params.id;
  const { name, age, species, ismicrochipped, microchipnumber, ownerid } =
    await fetchPatient(id);
  const ownerName = (await fetchCustomer(ownerid as UUID)).name;

  return (
    <div className='flex flex-col items-start justify-start'>
      <h1 className='w-full border-b border-zinc-600 pb-2 text-4xl'>{name}</h1>
      <ul>
        <li>Age: {age}</li>
        <li>Species: {species}</li>
        <li>Microchip: {ismicrochipped ? 'Yes' : 'No'}</li>
        {ismicrochipped && <li>Microchip number: {microchipnumber}</li>}
        <li>
          <Link href={`/dashboard/customers/${ownerid}`}>
            Owner: {ownerName}
          </Link>
        </li>
      </ul>
    </div>
  );
}
