import { HttpClient } from '@move-in/core';

export { HttpClientError } from '@move-in/core';

const baseUrl = import.meta.env.VITE_API_URL as string;

export const httpClient = new HttpClient({
  baseUrl,
});
