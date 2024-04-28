import { createHealthRecord } from '@/app/lib/actions';
import { fetchPatients, fetchUserByEmail } from '@/app/lib/data';
import { auth } from '@/auth';
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import Select from '@/components/Select/Select';

export default async function Page() {
  const patients = await fetchPatients();
  const patientsFormatted = patients.map((patient) => ({
    label: `${patient.species} ${patient.name}, age: ${patient.age}${patient.ismicrochipped ? `, microchip No: ${patient.microchipnumber}` : ''}`,
    value: patient.id,
  }));
  const session = await auth();
  if (!session?.user?.email) return;

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
        name='vetName'
        label='Veterinarian'
        type='text'
        value={fullName}
      />
      <InputField hidden name='vet_id' label='Veterinarian ID' value={userId} />
      <Select
        name='pet_id'
        label='Patient'
        placeholder='Select patient'
        values={patientsFormatted}
      />
      <InputField
        name='description'
        label='Appointment Description'
        type='text'
        required
      />
      <Button type='submit'>Create</Button>
    </form>
  );
}
