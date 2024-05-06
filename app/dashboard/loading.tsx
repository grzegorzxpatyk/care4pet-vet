import { Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Spinner />
    </div>
  );
}
