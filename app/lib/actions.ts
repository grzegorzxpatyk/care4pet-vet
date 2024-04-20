'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { Species } from './types';

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

const CreateCustomer = CustomerFormSchema.omit({ id: true });

export async function createCustomer(formData: FormData) {
  const { name, email, phoneNumber } = CreateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
  });

  await sql`
  INSERT INTO customers (name, email, phoneNumber)
  VALUES (${name}, ${email}, ${phoneNumber})
  `;

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

const PatientFormSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  age: z.number(),
  species: z.enum([Species.DOG, Species.CAT, Species.COW, Species.RABBIT]),
  isMicrochipped: z.boolean(),
  microchipNumber: z.optional(z.number()),
  ownerId: z
    .string({ required_error: 'owner is required' })
    .uuid('UUID is in wrong format'),
});

const CreatePatient = PatientFormSchema.omit({ id: true });

export async function createPatient(formData: FormData) {
  const { name, age, species, isMicrochipped, microchipNumber, ownerId } =
    CreatePatient.parse({
      name: formData.get('name'),
      age: Number(formData.get('age')),
      species: formData.get('species'),
      isMicrochipped: formData.get('isMicrochipped') === 'on',
      microchipNumber: formData.get('microchipNumber')
        ? Number(formData.get('microchipNumber'))
        : undefined,
      ownerId: formData.get('ownerId'),
    });

  const rawFormData = Object.fromEntries(formData.entries());
  console.log(rawFormData);

  const isMicrochippedString = isMicrochipped ? 'true' : 'false';
  const microchipNumberFormatted =
    microchipNumber !== undefined ? microchipNumber : 'NULL';
  console.log(`
  INSERT INTO pets (name, age, species, ismicrochipped, microchipnumber, ownerid)
  VALUES ('${name}', ${age}, '${species}', ${isMicrochippedString}, ${microchipNumberFormatted}, '${ownerId}');
`);

  await sql`
    INSERT INTO pets (name, age, species, ismicrochipped, microchipnumber, ownerid)
    VALUES ('${name}', ${age}, '${species}', ${isMicrochippedString}, ${microchipNumberFormatted}, '${ownerId}');
  `;

  revalidatePath('/dashboard/patients');
  redirect('/dashboard/patients');
}
