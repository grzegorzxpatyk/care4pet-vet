import { Half2Icon } from '@radix-ui/react-icons';
import Button from '../Button/Button';

export function ThemeSwitcherSkeleton() {
  return (
    <div className='p-2'>
      <Button
        variant='flat'
        color='default'
        isIconOnly
        isDisabled
        className='animate-pulse'
      >
        <Half2Icon />
      </Button>
    </div>
  );
}

