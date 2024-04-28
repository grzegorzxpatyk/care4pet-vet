import { UUID } from '@/app/lib/types';
import { fetchHealthRecord, fetchPatient, fetchUser } from '@/app/lib/data';
import clsx from 'clsx';

export default async function Page({ params }: { params: { id: UUID } }) {
  const healthRecord = await fetchHealthRecord(params.id);
  const vet = await fetchUser(healthRecord.vet_id);
  const pet = await fetchPatient(healthRecord.pet_id);

  return (
    <div className='flex flex-col items-start justify-start gap-4'>
      <h1 className='mb-4 flex w-full flex-col justify-start border-b border-zinc-500 text-4xl'>
        Apointment from {healthRecord.date.toDateString()}
        <span className='text-base'>
          Time: {healthRecord.date.toTimeString()}
        </span>
      </h1>
      <div className='grid w-full auto-cols-auto grid-cols-2 border-b border-zinc-500'>
        <div className='flex flex-col items-start justify-start'>
          <h2 className='text-2xl'>Patient</h2>
          <ul>
            <li>Name: {pet.name}</li>
            <li>Age: {pet.age}</li>
            <li>Species: {pet.species}</li>
          </ul>
        </div>
        <div className='flex flex-col items-start justify-start'>
          <h2 className='text-2xl'>Veterinarian</h2>
          <ul>
            <li>Name: {vet.name}</li>
            <li>Email: {vet.email}</li>
          </ul>
        </div>
      </div>
      <article
        className={clsx(healthRecord.medication && 'border-b border-zinc-500')}
      >
        <h3 className='text-2xl'>Description</h3>
        <p>{healthRecord.description}</p>
      </article>
      {healthRecord.medication && (
        <article>
          <h3 className='text-2xl'>Medication</h3>
          <p>{healthRecord.medication}</p>
        </article>
      )}
    </div>
  );
}
