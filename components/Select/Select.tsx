'use client';

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';

export default function Select({
  name,
  label,
  placeholder,
  values,
}: {
  name: string;
  label: string;
  placeholder: string;
  values: Array<{ label: string; value: string }>;
}) {
  return (
    <div className='inline-flex w-full flex-row items-center justify-between gap-4'>
      <label htmlFor={name}>{label}</label>
      <RadixSelect.Root name={name}>
        <RadixSelect.Trigger className='inline-flex w-full items-center justify-center gap-[5px] rounded bg-zinc-300 p-2 text-base leading-none outline-none hover:bg-zinc-400 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-zinc-950 dark:bg-zinc-800 hover:dark:bg-zinc-700 dark:focus:shadow-white dark:data-[placeholder]:text-zinc-50'>
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className='w-full overflow-hidden rounded-md bg-zinc-300 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] dark:bg-zinc-800'>
            <RadixSelect.ScrollUpButton className='flex h-[25px] cursor-default items-center justify-center bg-zinc-300 dark:bg-zinc-800'>
              <ChevronUpIcon />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className='p-[5px]'>
              <RadixSelect.Group>
                {values.map((item, i) => (
                  <RadixSelect.Item
                    value={item.value}
                    key={i}
                    className='relative flex select-none items-center justify-between rounded p-2 text-base leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-800/30 data-[disabled]:text-blue-400 data-[highlighted]:text-blue-600 data-[highlighted]:outline-none'
                  >
                    <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
                    <RadixSelect.ItemIndicator className='inline-flex w-[25px] items-center justify-center'>
                      <CheckIcon />
                    </RadixSelect.ItemIndicator>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Group>
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className='flex h-[25px] cursor-default items-center justify-center bg-zinc-300 dark:bg-zinc-800'>
              <ChevronDownIcon />
            </RadixSelect.ScrollDownButton>
            <RadixSelect.Arrow />
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}
