'use client';

import { isUUID } from '@/app/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Breadcrumb = {
  label: string;
  url: string;
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbArray, setBreadcrumbArray] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    const func = async () => {
      const pathArray = pathname.split('/').slice(1);
      const labelArray = pathname.split('/').slice(1);
      if (labelArray.some((element) => isUUID(element))) {
        const res = await fetch('http://localhost:3000/api', {
          headers: {
            'X-PATHNAME': pathname,
          },
        });
        const data = await res.json();
        labelArray.splice(
          labelArray.findIndex((element) => isUUID(element)),
          1,
          data.name
        );
      }
      setBreadcrumbArray(
        pathArray.map((element, i) => {
          return {
            label: `${labelArray[i].charAt(0).toUpperCase()}${labelArray[i].slice(1)}`,
            url: `/${pathArray.slice(0, i + 1).join('/')}`,
          };
        })
      );
    };
    func();
    return () => {
      setBreadcrumbArray([]);
    };
  }, [pathname]);

  return (
    <div className='flex flex-row items-center justify-start gap-2'>
      {breadcrumbArray.map((element, i) => (
        <span key={element.url}>
          <Link href={element.url} className='mr-2'>
            {element.label}
          </Link>
          {i < breadcrumbArray.length - 1 && '>'}
        </span>
      ))}
    </div>
  );
}
