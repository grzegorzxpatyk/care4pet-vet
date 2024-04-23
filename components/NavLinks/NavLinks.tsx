'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className='flex w-full flex-col justify-start gap-2'>
      {['patients', 'customers', 'inventory', 'settings'].map((element) => (
        <Link key={element} href={`/dashboard/${element}`}>
          <li
            className={clsx(
              'w-full rounded bg-blue-800/10 p-3 capitalize transition-colors hover:bg-blue-800/30 hover:text-blue-950 dark:hover:text-blue-200',
              {
                'bg-blue-800/30': pathname === `/dashboard/${element}`,
              }
            )}
          >
            {element}
          </li>
        </Link>
      ))}
    </ul>
  );
}
