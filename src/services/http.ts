import { Ioptions, IoptionsData, IoptionsRequest } from '@/types';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

function queryStringify(data: Record<string, any>) {
  let url = '';
  for (const [key, value] of Object.entries(data)) {
    if (url.length != 0) {
      url += '&';
    }
    url += `${key}=${value}`;
  }
  console.log('url', url);
  return url;
}

type IHTTPрrops = (url: string, options?: Ioptions) => Promise<unknown>;

class HTTPTransport {
  get: IHTTPрrops = (url: string, options?: Ioptions) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    this.request(
      `${url}?${options?.data ? queryStringify(options.data) : ''}`,
      { ...options, data: {}, method: METHODS.GET },
      options?.timeout,
    );

  put = (url: string, options?: IoptionsData) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);

  post = (url: string, options?: IoptionsData) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    this.request(url, { ...options, method: METHODS.POST }, options?.timeout);

  delete = (url: string, options?: Ioptions) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);
  // PUT, POST, DELETE

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: IoptionsRequest, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('error'));
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers && Object.keys(headers).length) {
        Object.keys(headers).forEach((header) => {
          xhr.setRequestHeader(header, headers[header]);
        });
      }

      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.withCredentials = true;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (options?.type !== 'form') {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (options?.type === 'form') {
        xhr.send(data as FormData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
