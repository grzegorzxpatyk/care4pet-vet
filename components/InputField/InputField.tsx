import clsx from 'clsx';

interface InputFieldProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  label: string;
}

export default function InputField({ name, label, ...props }: InputFieldProps) {
  return (
    <div className='flex w-full select-none flex-row items-center justify-between gap-4'>
      <label
        htmlFor={name}
        className={clsx('select-none', props.hidden && 'hidden')}
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        className='rounded bg-zinc-300 p-2 text-zinc-950 placeholder:text-zinc-500 dark:bg-zinc-800 dark:text-zinc-50'
        {...props}
      />
    </div>
  );
}
