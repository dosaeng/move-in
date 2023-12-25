import urlJoin from 'url-join';
export interface HttpClientOptions {
  baseUrl?: string;
  inspectors?: HttpClientInspector[];
}

export interface HttpClientRequestOptions<TData = Record<string, unknown>> {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  body?: TData;
  responseType?: 'json' | 'text' | 'blob';
}

export interface FetchRequest extends RequestInit {
  url: string | URL;
}

export interface HttpClientInspector {
  request?: (request: FetchRequest) => FetchRequest | void;
  response?: (response: Response) => Response | void;
}

export class HttpClientError extends Error {
  constructor(
    message: string,
    public response: Response
  ) {
    super(message);
  }
}

export class HttpClient {
  private baseUrl?: string;
  private inspectors?: HttpClientInspector[];

  constructor({ baseUrl, inspectors }: HttpClientOptions) {
    this.baseUrl = baseUrl;
    this.inspectors = inspectors;
  }

  private buildUrl(
    path: string,
    params?: Record<string, unknown>
  ): URL | string {
    const isValidBaseUrl = this.baseUrl != null && this.baseUrl !== '';
    const urlString = urlJoin(
      isValidBaseUrl ? this.baseUrl! : window.origin,
      path
    );
    const url = new URL(urlString);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value == null) return;

        url.searchParams.append(key, String(value));
      });
    }

    return url;
  }

  async get<TResponseData = unknown>(
    path: string,
    options: Omit<HttpClientRequestOptions, 'body' | 'method'> = {}
  ) {
    return this.request<void, TResponseData>(path, {
      ...options,
      method: 'GET',
    });
  }

  async post<TData = Record<string, unknown>, TResponseData = unknown>(
    path: string,
    options: HttpClientRequestOptions<TData> = {}
  ) {
    return this.request<TData, TResponseData>(path, {
      ...options,
      method: 'POST',
    });
  }

  async patch<TData = Record<string, unknown>, TResponseData = unknown>(
    path: string,
    options: HttpClientRequestOptions<TData> = {}
  ) {
    return this.request<TData, TResponseData>(path, {
      ...options,
      method: 'PATCH',
    });
  }

  async put<TData = Record<string, unknown>, TResponseData = unknown>(
    path: string,
    options: HttpClientRequestOptions<TData> = {}
  ) {
    return this.request<TData, TResponseData>(path, {
      ...options,
      method: 'PUT',
    });
  }
  async delete<TResponseData = unknown>(
    path: string,
    options: Omit<HttpClientRequestOptions, 'body' | 'method'> = {}
  ) {
    return this.request<TResponseData>(path, { ...options, method: 'DELETE' });
  }

  async request<TData = Record<string, unknown>, TResponseData = unknown>(
    path: string,
    {
      params,
      headers,
      body,
      method,
      responseType = 'json',
    }: HttpClientRequestOptions<TData> = {}
  ) {
    const url = this.buildUrl(path, params);
    let request: FetchRequest = {
      url,
      method: method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    };

    for (const inspector of this.inspectors ?? []) {
      if (inspector?.request == null) continue;

      request = (await inspector.request(request)) ?? request;
    }

    let response = await fetch(request.url, request);

    for (const inspector of this.inspectors ?? []) {
      if (inspector?.response == null) continue;

      response = (await inspector.response(response)) ?? response;
    }

    if (!response.ok) {
      throw new HttpClientError(
        `Failed to ${method} ${path} ${response.status}`,
        response
      );
    }

    switch (responseType) {
      case 'blob':
        try {
          return (await response.blob()) as TResponseData;
        } catch (error) {
          return new Blob() as TResponseData;
        }
      case 'text':
        try {
          return (await response.text()) as TResponseData;
        } catch (error) {
          return '' as TResponseData;
        }
      case 'json':
      default:
        try {
          return (await response.json()) as TResponseData;
        } catch (error) {
          return {} as TResponseData;
        }
    }
  }
}
