import AppLogo from '@/components/AppLogo/AppLogo';
import Navigation from '@/components/Navigation/Navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid h-full w-full grid-cols-[280px_1fr] grid-rows-[100px_1fr]'>
      <div className='border-b border-r border-zinc-600 p-8'>
        <AppLogo />
      </div>
      <div className='border-b border-zinc-600 p-8 text-2xl'>
        Breadcrumbs go here
      </div>
      <div className='border-r border-zinc-600 p-8'>
        <Navigation />
      </div>
      <div className='p-8'>{children}</div>
    </div>
  );
}
