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
