import { UUID } from './types';

export function isUUID(value: any): value is UUID {
  // Regular expression to match UUID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // Check if the value matches the UUID format
  return typeof value === 'string' && uuidRegex.test(value);
}

export const fetchResource = async (id: UUID) => {
  const res = await fetch('http://localhost:3000/api', {
    headers: {
      'X-ID': id,
    },
  });
  const data = await res.json();
  return data.pathname;
};
