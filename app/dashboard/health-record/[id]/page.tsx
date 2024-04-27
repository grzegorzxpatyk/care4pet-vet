import { fetchHealthRecord, fetchPatient, fetchUserById } from '@/app/lib/data';
import { UUID } from '@/app/lib/types';

export default async function Page({ params }: { params: { id: UUID } }) {
  const healthRecord = await fetchHealthRecord(params.id);
  if (!healthRecord) {
    return new Error('Surprise Motherfucker');
  }
  const vet = await fetchUserById(healthRecord.vet_id);
  const pet = await fetchPatient(healthRecord.pet_id);

  if (!vet || !pet) {
    return new Error('Surprise Motherfucker x2');
  }

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
      <article>
        <h3 className='text-2xl'>Description</h3>
        <p>{healthRecord.description}</p>
      </article>
    </div>
  );
}
