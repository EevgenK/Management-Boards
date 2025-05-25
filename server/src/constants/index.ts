import { getEnvVar } from '../utils/getEnvVar';
export const PORT = Number(getEnvVar('PORT', '4000'));
export const ORIGINSALLOWED = [
  'http://localhost:4000',
  getEnvVar('PROD_DOMAIN'),
  getEnvVar('DEV_DOMAIN'),
];
