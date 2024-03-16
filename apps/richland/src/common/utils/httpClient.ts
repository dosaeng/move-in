import { HttpClient } from '@move-in/core';
import { enable as enableMocking } from './defineMock';

export { HttpClientError } from '@move-in/core';

const baseUrl = import.meta.env.VITE_API_URL as string;

export const httpClient = new HttpClient({
  baseUrl: enableMocking ? '' : baseUrl,
});
