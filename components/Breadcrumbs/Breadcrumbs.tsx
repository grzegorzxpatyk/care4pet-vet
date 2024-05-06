'use client';

import { isUUID } from '@/app/lib/utils';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Breadcrumb = {
  label: string;
  url: string;
};

export default function BreadcrumbsContainer() {
  const pathname = usePathname();
  const [breadcrumbArray, setBreadcrumbArray] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    const func = async () => {
      const pathArray = pathname.split('/').slice(1);
      const labelArray = [...pathArray];
      if (labelArray.some((element) => isUUID(element))) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api`, {
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
        labelArray.map((element, i) => {
          return {
            label: `${element.charAt(0).toUpperCase()}${element.slice(1)}`,
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
    <Breadcrumbs size='lg'>
      {breadcrumbArray.map((element, i) => (
        <BreadcrumbItem key={element.url} href={element.url}>
          {element.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
