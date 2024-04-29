import { createKysely } from '@vercel/postgres-kysely';
import { unstable_noStore as noStore } from 'next/cache';
import { Customer, HealthRecord, IPet, User, UUID } from './types';

interface Database {
  patients: IPet;
  customers: Customer;
  users: User;
  health_records: HealthRecord;
}

export type TableName = 'patients' | 'customers' | 'users' | 'health_records';

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
      .selectFrom('patients as p')
      .innerJoin('customers as c', 'c.id', 'p.ownerid')
      .select([
        'p.id',
        'p.name',
        'p.age',
        'p.species',
        'p.ismicrochipped',
        'p.microchipnumber',
        'p.ownerid',
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
      .selectFrom('patients')
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
      .selectFrom('patients')
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

export async function fetchHealthRecord(id: UUID) {
  noStore();
  try {
    const healthRecord = await db
      .selectFrom('health_records')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
    return healthRecord;
  } catch (error) {
    console.error(`Error occured while fetching health record data: ${error}`);
    throw new Error('Failed to fetch health record data.');
  }
}

export async function fetchUserByEmail(email: string) {
  noStore();
  try {
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
    return user;
  } catch (error) {
    console.error(`Failed to fetch user: ${error}`);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUser(id: UUID) {
  noStore();
  try {
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
    return user;
  } catch (error) {
    console.error(`Error occured while fetching patient data: ${error}`);
    throw new Error('Failed to fetch patient data.');
  }
}

export async function fetchResourceByIdAndTableName(
  id: UUID,
  tableName: TableName
) {
  noStore();
  try {
    if (!id || !tableName) {
      throw new Error('Missing function parameter(s)');
    }
    const patientName = await db
      .selectFrom(tableName)
      .select(['id', 'name'])
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
    return patientName;
  } catch (error) {
    console.error(`Error occured while fetching patient data: ${error}`);
    throw new Error('Failed to fetch patient data.');
  }
}