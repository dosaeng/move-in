import { enableMock } from "./defineMock";

interface HttpClientOptions {
  baseUrl?: string;
}

interface HttpClientRequestOptions<TData = Record<string, unknown>> {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  body?: TData;
  responseType?: 'json' | 'text' | 'blob';
}

class HttpClientError extends Error {
  constructor(message: string, public response: Response) {
    super(message);
  }
}

class HttpClient {
  private baseUrl?: string;

  constructor({ baseUrl }: HttpClientOptions) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(path: string, params?: Record<string, unknown>): URL | string {
    if (enableMock) return path;

    const url = new URL(path, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value == null) return;

        url.searchParams.append(key, String(value));
      });
    }

    return url;
  }

  async get<TResponseData = unknown>(path: string, { params, headers }: Omit<HttpClientRequestOptions, 'body' | 'method'> = {}) {
    return this.request<void, TResponseData>(path, { params, headers, method: 'GET' });
  }

  async post<TData = Record<string, unknown>, TResponseData = unknown>(path: string, { params, headers, body }: HttpClientRequestOptions<TData> = {}) {
    return this.request<TData, TResponseData>(path, { params, headers, body, method: 'POST' });
  }

  async patch<TData = Record<string, unknown>, TResponseData = unknown>(path: string, { params, headers, body }: HttpClientRequestOptions<TData> = {}) {
    return this.request<TData, TResponseData>(path, { params, headers, body, method: 'PATCH' });
  }

  async put<TData = Record<string, unknown>, TResponseData = unknown>(path: string, { params, headers, body }: HttpClientRequestOptions<TData> = {}) {
    return this.request<TData, TResponseData>(path, { params, headers, body, method: 'PUT' });
  }
  async delete<TResponseData = unknown>(path: string, { params, headers }: Omit<HttpClientRequestOptions, 'body' | 'method'> = {}) {
    return this.request<TResponseData>(path, { params, headers, method: 'DELETE' });
  }

  async request<TData = Record<string, unknown>, TResponseData = unknown>(path: string, { params, headers, body, method, responseType = 'json' }: HttpClientRequestOptions<TData> = {}) {
    const url = this.buildUrl(path, params);

    const response = await fetch(url, {
      method: method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new HttpClientError(`Failed to ${method} ${path} ${response.status}`, response);
    }

    switch (responseType) {
      case 'blob':
        try {
          return response.blob() as TResponseData;
        } catch (error) {
          return new Blob() as TResponseData;
        }
      case 'text':
        try {
          return response.text() as TResponseData;
        } catch (error) {
          return "" as TResponseData;
        }
      case 'json':
      default:
        try {
          return response.json() as TResponseData;
        } catch (error) {
          return {} as TResponseData;
        }
    }
  }
}

export const httpClient = new HttpClient({ baseUrl: import.meta.env.VITE_API_URL as string });
