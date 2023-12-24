import { HttpClient, HttpClientInspector } from '@move-in/core';
import { enableMock } from './defineMock';

const mockInspector: HttpClientInspector = {
  request(request) {
    if (!enableMock) {
      return request;
    }

    return {
      ...request,
      url: request.url
        .toString()
        .replace(import.meta.env.VITE_API_URL as string, ''),
    };
  },
};

const authInspector: HttpClientInspector = {
  request(request) {
    return {
      ...request,
      credentials: 'include',
    };
  },
  response(response) {
    if (response.status === 401) {
      window.location.href = '/sign-out';
    }

    return response;
  },
};

export const httpClient = new HttpClient({
  baseUrl: import.meta.env.VITE_API_URL as string,
  inspectors: [mockInspector, authInspector],
});
