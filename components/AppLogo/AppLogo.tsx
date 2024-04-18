import clsx from 'clsx';

export default function AppLogo({
  size = 'md',
}: {
  size?: 'lg' | 'md' | 'sm';
}) {
  return (
    <h1
      className={clsx({
        'text-2xl': size === 'sm',
        'text-3xl': size === 'md',
        'text-6xl': size === 'lg',
      })}
    >
      Care4Pet <span className='text-blue-800'>Vet</span>
    </h1>
  );
}
