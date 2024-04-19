'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathnameArray = pathname.split('/').slice(1);

  return (
    <div className='flex flex-row items-center justify-start gap-2'>
      {pathnameArray.map((element, i) => (
        <>
          <Link
            href={`/${pathnameArray.slice(0, i + 1).join('/')}`}
            key={element}
            className='capitalize'
          >
            {element}
          </Link>
          {i < pathnameArray.length - 1 && '>'}
        </>
      ))}
    </div>
  );
}
