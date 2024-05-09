'use client';

import {
  Autocomplete as NextUIAutocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from '@nextui-org/autocomplete';
import { Input } from '@nextui-org/input';
import { Key, useState } from 'react';

type Collection = { label: string; value: string }[];

interface IAutocomplete extends Omit<AutocompleteProps, 'children'> {
  collection: Collection;
}

export default function Autocomplete({ collection, ...props }: IAutocomplete) {
  const [selectedValue, setValue] = useState('');

  function handleSelectionChange(value: Key | null) {
    if (value === null || typeof value !== 'string') {
      console.error(
        'provided value to onSelectionChange event handler has incorrect type. Check implementation for details.'
      );
      return;
    }
    setValue(value);
  }

  function handleInputChange(value: Key | null) {
    if (value === null) {
      console.error(
        'provided value to onInputChange event handler has incorrect type. Check implementation for details.'
      );
      return;
    }
    if (value === '') setValue('');
  }

  return (
    <>
      <NextUIAutocomplete
        onSelectionChange={handleSelectionChange}
        onInputChange={handleInputChange}
        {...props}
        name={`${props.name}_select`}
      >
        {collection.map((item) => (
          <AutocompleteItem key={item.value} value={item.value}>
            {item.label}
          </AutocompleteItem>
        ))}
      </NextUIAutocomplete>
      <Input
        hidden
        aria-hidden
        isReadOnly
        name={props.name}
        value={selectedValue}
        classNames={{ base: 'hidden' }}
        isRequired
      />
    </>
  );
}
