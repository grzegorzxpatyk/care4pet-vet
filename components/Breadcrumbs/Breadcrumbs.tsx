'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const breadcrumbFormatted = async (breadcrumb: string) => {
  return breadcrumb.includes('-')
    ? breadcrumb.split('-').join(' ')
    : breadcrumb;
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathnameArray = pathname.split('/').slice(1);

  return (
    <div className='flex flex-row items-center justify-start gap-2'>
      {pathnameArray.map((element, i) => (
        <span key={element}>
          <Link
            href={`/${pathnameArray.slice(0, i + 1).join('/')}`}
            className='mr-2 capitalize'
          >
            {breadcrumbFormatted(element)}
          </Link>
          {i < pathnameArray.length - 1 && '>'}
        </span>
      ))}
    </div>
  );
}
