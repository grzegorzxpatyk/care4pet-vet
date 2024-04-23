import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - not found',
};

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource in dahsboard</p>
      <Link href='/'>Return Home</Link>
    </div>
  );
}
