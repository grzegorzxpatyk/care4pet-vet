import { fetchPatients, fetchUserByEmail } from '@/app/lib/data';
import { auth } from '@/auth';
import CreateForm from '@/components/HealthRecords/CreateForm';

export default async function Page() {
  const patients = await fetchPatients();
  const patientsFormatted = patients.map((patient) => ({
    label: patient.name,
    value: patient.id,
    description: `${patient.species}, age: ${patient.age}${patient.ismicrochipped ? `, microchip No: ${patient.microchipnumber}` : ''}`,
  }));

  const session = await auth();
  if (!session?.user?.email) throw new Error('user not logged in');

  const user = await fetchUserByEmail(session?.user?.email);
  const fullName = user?.name;
  const userId = user?.id;

  if (typeof fullName !== 'string' || typeof userId !== 'string') {
    return null;
  }

  return (
    <CreateForm
      fullName={fullName}
      userId={userId}
      patients={patientsFormatted}
    />
  );
}
