'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

const CreateCustomer = FormSchema.omit({ id: true });

export default async function createCustomer(formData: FormData) {
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
