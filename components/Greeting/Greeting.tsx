import { auth } from '@/auth';

export default async function Greeting() {
  const session = await auth();
  const firstName = session?.user?.name?.split(' ')[0];
  return <h2 className='text-4xl'>Hello {firstName}!</h2>;
}
