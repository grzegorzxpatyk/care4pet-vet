import AppLogo from '@/components/AppLogo/AppLogo';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Navigation from '@/components/Navigation/Navigation';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Dashboard',
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid h-dvh w-full grid-cols-[280px_1fr] grid-rows-[100px_1fr]'>
      <div className='border-b border-r border-zinc-600 p-8'>
        <Link href='/dashboard'>
          <AppLogo />
        </Link>
      </div>
      <div className='flex flex-row items-center justify-between border-b border-zinc-600 p-8 text-2xl'>
        <Breadcrumbs />
        <ThemeSwitcher />
      </div>
      <div className='border-r border-zinc-600 p-8'>
        <Navigation />
      </div>
      <div className='p-8'>{children}</div>
    </div>
  );
}
