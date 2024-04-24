import { createKysely } from '@vercel/postgres-kysely';
import { unstable_noStore as noStore } from 'next/cache';
import { Customer, IPet, UUID } from './types';

interface Database {
  pets: IPet;
  customers: Customer;
}

const db = createKysely<Database>();

export async function fetchCustomers() {
  noStore();
  try {
    const customers = db.selectFrom('customers').selectAll().execute();
    return customers;
  } catch (error) {
    console.error(`Error occured while fetching customers data: ${error}`);
    throw new Error('Failed to fetch customers data.');
  }
}

export async function fetchCustomersIdAndName() {
  noStore();
  try {
    const customers = await db
      .selectFrom('customers')
      .select(['id', 'name'])
      .execute();
    return customers;
  } catch (error) {
    console.error(`Error occured while fetching customers data: ${error}`);
    throw new Error('Failed to fetch customers data.');
  }
}

export async function fetchCustomer(id: UUID) {
  noStore();
  try {
    const customer = await db
      .selectFrom('customers')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
    return customer;
  } catch (error) {
    console.error(`Error occured while fetching customer data: ${error}`);
    throw new Error('Failed to fetch customer data.');
  }
}

export async function fetchPatients() {
  noStore();
  try {
    const patients = await db
      .selectFrom('pets')
      .innerJoin('customers as c', 'c.id', 'pets.ownerid')
      .select([
        'pets.id',
        'pets.name',
        'pets.age',
        'pets.species',
        'pets.ismicrochipped',
        'pets.microchipnumber',
        'pets.ownerid',
        'c.name as owner_name',
      ])
      .execute();
    return patients;
  } catch (error) {
    console.error(`Error occured while fetching patients data: ${error}`);
    throw new Error('Failed to fetch patients data.');
  }
}

export async function fetchPatient(id: UUID) {
  noStore();
  try {
    const patient = await db
      .selectFrom('pets')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
    return patient;
  } catch (error) {
    console.error(`Error occured while fetching patient data: ${error}`);
    throw new Error('Failed to fetch patient data.');
  }
}

export async function fetchPatientsByOwnerId(ownerId: UUID) {
  noStore();
  try {
    const patients = await db
      .selectFrom('pets')
      .select(['id', 'name', 'species'])
      .where('ownerid', '=', ownerId)
      .execute();
    return patients;
  } catch (error) {
    console.error(
      `Error occured while fetching patients by ownerId data: ${error}`
    );
    throw new Error('Failed to fetch patients data.');
  }
}
