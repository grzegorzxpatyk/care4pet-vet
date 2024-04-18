import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul className='flex flex-col justify-start gap-2'>
        {['patients', 'customers', 'inventory', 'settings'].map((element) => (
          <Link key={element} href={`/dashboard/${element}`}>
            <li className='w-full rounded bg-blue-800/10 p-3 capitalize transition-colors hover:bg-blue-800/30 hover:text-blue-200'>
              {element}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
