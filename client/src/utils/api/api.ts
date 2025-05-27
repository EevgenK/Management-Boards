import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:4000' : '/api',
});
