type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type Customer = {
  id: UUID;
  name: string;
  email: string;
  phoneNumber: string;
};

export enum Species {
  DOG = 'Dog',
  CAT = 'Cat',
  COW = 'Cow',
  RABBIT = 'Rabbit',
}

export interface IPet {
  id: UUID;
  name: string;
  age: number;
  species: Species;
  ismicrochipped: boolean;
  microchipnumber?: number;
  ownerid: string;
}

export type Veterinarian = {
  id: UUID;
  name: string;
  email: string;
  phoneNumber: string;
};

export type HistoryEntry = {
  petId: UUID;
  vetId: UUID;
  date: Date;
  description: string;
};
