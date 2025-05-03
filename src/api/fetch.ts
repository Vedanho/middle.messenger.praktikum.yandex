enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
// type RequestData = XMLHttpRequestBodyInit;

interface RequestOptions<T = Record<string, unknown>> {
  headers?: Record<string, string>;
  method?: METHODS;
  data?: T;
  timeout?: number;
}

export function queryStringify(data: XMLHttpRequestBodyInit): string {
  if (!data) {
    return '';
  }

  const result = Object.entries(data).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      const arrayArgs = value.join(',');
      acc += `${key}=${arrayArgs}&`;
      return acc;
    }

    acc += `${key}=${value}&`;
    return acc;
  }, '?');

  return result.slice(0, -1);
}

export class HTTPTransport {
  private apiUrl: string = '';

  constructor(apiPath: string) {
    this.apiUrl = `https://ya-praktikum.tech/api/v2/${apiPath}`;
  }

  public get = (url: string = '', options: RequestOptions = {}): Promise<XMLHttpRequest> => (
    this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.GET }, options.timeout));

  public post = <T>(url: string, options: RequestOptions<T> = {}): Promise<XMLHttpRequest> => (
    this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.POST }, options.timeout));

  public put = <T>(url: string, options: RequestOptions<T> = {}): Promise<XMLHttpRequest> => (
    this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.PUT }, options.timeout));

  public delete = <T>(url: string, options: RequestOptions<T> = {}): Promise<XMLHttpRequest> => (
    this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.DELETE }, options.timeout));

  private request = <T>(url: string, options: RequestOptions<T> = {}, timeout = 5000): Promise<XMLHttpRequest> => {
    const {
      headers = {
        'Content-Type': 'application/json',
      }, method, data,
    } = options;
    console.log(headers);
    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(JSON.stringify(data))}`
          : url,
      );
      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        console.log(headers);
        xhr.setRequestHeader(key, headers[key]);
      });

      // eslint-disable-next-line func-names
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
