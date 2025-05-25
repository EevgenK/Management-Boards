import { CorsOptions } from 'cors';
import { ORIGINSALLOWED } from '../constants';

export const checkCorsOrigin: NonNullable<CorsOptions['origin']> = (
  origin,
  callback,
) => {
  const isAllowed = !origin || ORIGINSALLOWED.includes(origin);
  callback(isAllowed ? null : new Error('Not allowed by CORS'), isAllowed);
};
