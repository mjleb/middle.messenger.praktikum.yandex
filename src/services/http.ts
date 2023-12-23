import { fJSONparse } from './helpers';
import { IoptionsRequest } from '../types';
import links from '../pages/links.json' assert { type: 'json' };

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export function queryStringify(data: Record<string, any>) {
  let url = '';
  for (const [key, value] of Object.entries(data)) {
    if (url.length != 0) {
      url += '&';
    }
    url += `${key}=${value}`;
  }
  // encodeURI(

  return encodeURI(url);
}
export type RequestOptionsProps = {
  data?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  type?: string;
};
export type HTTPMethodProps = (url: string, options?: RequestOptionsProps) => Promise<unknown>;

// type HTTPMethod = <T>(url: string, options?: Ioptions) => Promise<T>;

class HTTPTransport {
  // -------------------------------

  get: HTTPMethodProps = (url, options) => this.request(options?.data ? `${url}?${queryStringify(options.data)}` : url, { ...options, data: {}, method: METHODS.GET }, options?.timeout);

  post: HTTPMethodProps = (url, options) => this.request(url, { ...options, method: METHODS.POST }, options?.timeout);

  put: HTTPMethodProps = (url, options) => this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);

  delete: HTTPMethodProps = (url, options) => this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);

  // -------------------------------

  request = (url: string, options: IoptionsRequest, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('error'));
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      // console.log('url', url);

      if (headers && Object.keys(headers).length) {
        Object.keys(headers).forEach((header) => {
          xhr.setRequestHeader(header, headers[header]);
        });
      }
      /*
      // eslint-disable-next-line func-names
      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.onerror = reject;
      */
      // ----------------------
      // eslint-disable-next-line func-names
      xhr.onload = function () {
        const responseText = fJSONparse(this.response);
        if (this.status !== 200) {
          const path = window.location.pathname;
          if (this.status == 401 && path != `${links.login}` && path != `${links.signup}`) {
            reject(new Error('401'));
            // router.go(links.login);
          }
          const { reason } = responseText;
          console.warn(`Wrong: ${reason}`);
          reject(new Error(reason));
        }
        resolve(responseText);
      };
      // eslint-disable-next-line func-names
      xhr.onerror = function () {
        reject(new Error('Network Error'));
      };
      // ----------------------
      xhr.withCredentials = true;
      xhr.onabort = reject;
      // eslint-disable-next-line func-names
      xhr.ontimeout = function () {
        reject(new Error('timeout'));
      };
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
