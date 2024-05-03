import { TableName } from './data';
import { ThemeString, UUID } from './types';

export function isUUID(value: any): value is UUID {
  // Regular expression to match UUID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // Check if the value matches the UUID format
  return typeof value === 'string' && uuidRegex.test(value);
}

export function isTableName(value: any): value is TableName {
  const tableNameRegex = /^(patients|customers|users|health_records)$/;

  return typeof value === 'string' && tableNameRegex.test(value);
}

export const formatBreadcrumb = async (breadcrumb: string) => {
  return breadcrumb.includes('-')
    ? breadcrumb.split('-').join(' ')
    : breadcrumb;
};

export function isThemeString(value: any): value is ThemeString {
  if (
    typeof value !== 'string' ||
    (value !== 'light' && value !== 'dark' && value !== 'system')
  ) {
    return false;
  }
  return true;
}
