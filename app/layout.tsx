import './globals.css';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Care4Pet - Vet',
    template: '%s | Care4Pet - Vet',
  },
  description: 'Streamlining veterinary care.',
  authors: { name: 'Greg Patyk', url: 'https://gpatyk.dev' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${GeistSans.className} h-dvh w-dvw bg-zinc-200 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
