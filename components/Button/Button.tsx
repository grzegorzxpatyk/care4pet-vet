import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const button = cva(
  [
    'inline-flex',
    'justify-center',
    'items-center',
    'rounded',
    'border',
    'border-zinc-700',
    'transition-all',
    'active:scale-95',
    'font-semibold',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-zinc-900',
          'text-zinc-200',
          'hover:enabled:bg-zinc-800',
          'dark:bg-zinc-100',
          'dark:text-zinc-900',
          'dark:hover:enabled:bg-zinc-300',
        ],
        secondary: [
          'bg-zinc-100',
          'dark:bg-zinc-900',
          'text-zinc-900',
          'dark:text-zinc-200',
          'hover:enabled:bg-zinc-300',
          'dark:hover:enabled:bg-zinc-800',
        ],
        ghost: [
          'border-none',
          'bg-transparent',
          'text-blue-700',
          'hover:enabled:bg-blue-800/20',
        ],
      },
      size: {
        sm: ['min-w-fit', 'h-fit', 'min-h-10', 'text-sm', 'py-1.5', 'px-4'],
        base: ['min-w-24', 'h-fit', 'min-h-10', 'text-base', 'py-2', 'px-4'],
        lg: ['min-w-32', 'h-fit', 'min-h-12', 'text-lg', 'py-2.5', 'px-6'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export default function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(button({ variant, size, className }))}
      {...props}
    >
      {props.children}
    </button>
  );
}
