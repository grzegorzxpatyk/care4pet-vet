import { fetchResourceByIdAndTableName } from '../lib/data';
import { isTableName, isUUID } from '../lib/utils';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request: Request) {
  if (
    !request.headers.has('X-PATHNAME') &&
    request.headers.get('X-PATHNAME') === null
  ) {
    throw new Error('There is no X-PATHNAME header provided.');
  }
  const pathname = request.headers.get('X-PATHNAME');
  if (pathname === null) {
    throw new Error('X-PATHNAME is null');
  }
  console.log(pathname);
  const pathnameArray = pathname.split('/');
  const id = pathnameArray.find((element) => isUUID(element));
  if (!isUUID(id)) {
    throw new Error(
      'The provided id in X-PATHNAME header value is not in UUID format.'
    );
  }
  let tableName = pathnameArray?.at(2);
  if (tableName === 'health-record') {
    tableName = 'health_records';
  }

  if (!isTableName(tableName)) {
    throw new Error('The category provided in pathname is unknown.');
  }

  const foundResource = await fetchResourceByIdAndTableName(id, tableName);

  return Response.json({
    id: foundResource.id,
    name:
      foundResource.name ??
      `${foundResource.date.toDateString()}, ${foundResource.date.toTimeString()}`,
  });
}
