enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
type RequestData = XMLHttpRequestBodyInit;

interface RequestOptions {
  headers?: Record<string, string>;
  method?: METHODS;
  data?: RequestData;
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
  public get = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => (
    this.request(url, { ...options, method: METHODS.GET }, options.timeout));

  public post = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => (
    this.request(url, { ...options, method: METHODS.POST }, options.timeout));

  public put = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => (
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout));

  public delete = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => (
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout));

  private request = (url: string, options: RequestOptions = {}, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

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
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

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
        xhr.send(data);
      }
    });
  };
}
