import { Half2Icon } from '@radix-ui/react-icons';
import Button from '../Button/Button';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';

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

export function BreadcrumbsSkeleton() {
  return (
    <Breadcrumbs
      size='lg'
      itemClasses={{ item: 'w-20 bg-zinc-500/30 rounded animate-pulse' }}
    >
      {['loading', 'loading', 'loading'].map((element, i) => (
        <BreadcrumbItem key={i}>&nbsp;</BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
