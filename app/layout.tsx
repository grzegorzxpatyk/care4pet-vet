import './globals.css';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { Providers } from './providers';

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
        className={`${GeistSans.className} h-dvh w-dvw overflow-hidden bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
