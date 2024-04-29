'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { Customer, HealthRecord, IPet, Species, User, UUID } from './types';
import { createKysely } from '@vercel/postgres-kysely';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

interface Database {
  patients: Omit<IPet, 'id'>;
  customers: Omit<Customer, 'id'>;
  users: User;
  health_records: Omit<HealthRecord, 'id' | 'date'>;
}

const db = createKysely<Database>();

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

  await db
    .insertInto('customers')
    .values({
      name: name,
      email: email,
      phonenumber: phoneNumber,
    })
    .execute();

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

  await db
    .insertInto('patients')
    .values({
      name: name,
      age: age,
      species: species,
      ismicrochipped: isMicrochipped,
      microchipnumber: microchipNumber,
      ownerid: ownerId,
    })
    .execute();

  revalidatePath('/dashboard/patients');
  redirect('/dashboard/patients');
}

const HealthRecordFormSchema = z.object({
  id: z.string().uuid(),
  pet_id: z.string().uuid(),
  vet_id: z.string().uuid(),
  date: z.string().datetime(),
  description: z.string(),
  medication: z.string().nullish(),
});

const CreateHelthRecord = HealthRecordFormSchema.omit({ id: true, date: true });

export async function createHealthRecord(formData: FormData) {
  const { pet_id, vet_id, description, medication } = CreateHelthRecord.parse({
    pet_id: formData.get('pet_id'),
    vet_id: formData.get('vet_id'),
    description: formData.get('description'),
    medication: formData.has('medication')
      ? formData.get('medication')
      : undefined,
  });

  await db
    .insertInto('health_records')
    .values({
      pet_id: pet_id as UUID,
      vet_id: vet_id as UUID,
      description: description,
      medication: medication as string | undefined,
    })
    .execute();

  revalidatePath('/dashboard/health-records');
  redirect('/dashboard/health-records');
}
