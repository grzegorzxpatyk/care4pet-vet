import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  return (
    <div className='flex flex-col items-start justify-start gap-8'>
      <h1 className='text-2xl'>Account details</h1>
      <ul>
        <li>Name: {session?.user?.name}</li>
        <li>Email: {session?.user?.email}</li>
      </ul>
    </div>
  );
}
