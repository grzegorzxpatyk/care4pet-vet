import { createHealthRecord } from '@/app/lib/actions';
import { fetchPatients, fetchUserByEmail } from '@/app/lib/data';
import { auth } from '@/auth';
import InputField from '@/components/InputField/InputField';
import Select from '@/components/Select/Select';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import Textarea from '@/components/Textarea/Textarea';

export default async function Page() {
  const patients = await fetchPatients();
  const patientsFormatted = patients.map((patient) => ({
    label: `${patient.species} ${patient.name}, age: ${patient.age}${patient.ismicrochipped ? `, microchip No: ${patient.microchipnumber}` : ''}`,
    value: patient.id,
  }));
  const session = await auth();
  if (!session?.user?.email) throw new Error('user not logged in');

  const user = await fetchUserByEmail(session?.user?.email);
  const fullName = user?.name;
  const userId = user?.id;

  return (
    <form
      action={createHealthRecord}
      className='flex h-full w-full flex-col items-start justify-start gap-4'
    >
      <InputField
        readOnly
        disabled
        name='vetName'
        label='Veterinarian'
        type='text'
        value={fullName}
      />
      <InputField
        hidden
        readOnly
        name='vet_id'
        label='Veterinarian ID'
        value={userId}
      />
      <Select
        name='pet_id'
        label='Patient'
        placeholder='Select patient'
        values={patientsFormatted}
      />
      <Textarea
        name='description'
        label='Appointment description'
        rows={5}
        placeholder='Place your notes here...'
        required
      />
      <SubmitButton>Create</SubmitButton>
    </form>
  );
}
