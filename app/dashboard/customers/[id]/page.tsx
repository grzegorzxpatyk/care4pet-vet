import { fetchCustomer, fetchPatientsByOwnerId } from '@/app/lib/data';
import { UUID } from '@/app/lib/types';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: UUID } }) {
  const { name, email, phonenumber } = await fetchCustomer(params.id);
  const customerPets = await fetchPatientsByOwnerId(params.id);

  return (
    <div className='flex flex-col items-start justify-start'>
      <h1 className='w-full border-b border-zinc-600 pb-2 text-4xl'>{name}</h1>
      <ul>
        <li>Email: {email}</li>
        <li>Phone number: {phonenumber}</li>
      </ul>

      {customerPets.length > 0 && (
        <section className='mt-4'>
          <h2 className='text-2xl'>Pets</h2>
          <ul>
            {customerPets.map((pet) => (
              <li key={pet.id}>
                <Link href={`/dashboard/patients/${pet.id}`}>
                  {pet.species} {pet.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
