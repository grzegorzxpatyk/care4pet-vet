import Button from '@/components/Button/Button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex flex-col items-start justify-start gap-8'>
      <h1 className='text-4xl'>List of health records</h1>
      <Link href={'/dashboard/health-record/create'} passHref>
        <Button variant={'ghost'}>Create</Button>
      </Link>
    </div>
  );
}
