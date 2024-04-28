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
        className='rounded bg-zinc-400/50 p-2'
        {...props}
      />
    </div>
  );
}
