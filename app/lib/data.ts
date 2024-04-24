import { sql } from '@vercel/postgres';
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
    const customersDataPromise = sql`SELECT * FROM customers`;
    const data = await customersDataPromise;
    return data.rows;
  } catch (error) {
    console.error(`Error occured while fetching customers data: ${error}`);
    throw new Error('Failed to fetch customers data.');
  }
}

export async function fetchCustomersSimple() {
  noStore();
  try {
    const customersDataPromise = sql`SELECT id, name FROM customers`;
    const data = await customersDataPromise;
    return data.rows;
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
    const patientsDataPromise = sql`
    SELECT 
        p.id AS id, 
        p.name AS name, 
        p.age AS age, 
        p.species AS species, 
        p.isMicrochipped AS isMicrochipped, 
        p.microchipNumber AS microchipNumber, 
        c.name AS ownerName
    FROM 
        pets p
    JOIN 
        customers c ON p.ownerId = c.id;
    `;
    const data = await patientsDataPromise;
    return data.rows;
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