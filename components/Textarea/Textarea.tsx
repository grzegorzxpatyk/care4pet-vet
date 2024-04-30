interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  name: string;
  label: string;
}

export default function Textarea({ name, label, ...props }: TextareaProps) {
  return (
    <div className='flex w-full select-none flex-col items-start justify-start gap-4'>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        {...props}
        className='w-full resize-none rounded bg-zinc-300 p-2 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50'
      />
    </div>
  );
}
