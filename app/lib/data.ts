import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

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

export async function fetchPatients() {
  noStore();
  try {
    const patientsDataPromise = sql`SELECT * FROM pets`;
    const data = await patientsDataPromise;
    return data.rows;
  } catch (error) {
    console.error(`Error occured while fetching patients data: ${error}`);
    throw new Error('Failed to fetch patients data.');
  }
}
