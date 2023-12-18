import { Ioptions, IoptionsData, IoptionsRequest } from '@/types';
import links from '@/pages/links.json';
import router from './router';

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

// type IHTTPрrops = (url: string, options?: Ioptions) => Promise<unknown>;

type HTTPMethod = <T>(url: string, options?: Ioptions) => Promise<T>;

function StatusNot200(status: number, responseText: any) {
  const path = window.location.pathname;
  if (status !== 200) {
    const { reason } = responseText;
    console.warn(`Wrong: ${reason}`);
    if (status == 401 && path != `${links.login}` && path != `${links.signup}`) {
      router.go(links.login);
    }
    return false;
  }
  return responseText;
}

class HTTPTransport {
  get: HTTPMethod = async (url, options = {}) => {
    try {
      const response = (await this.request(url, { ...options, method: METHODS.GET }, options.timeout)) as XMLHttpRequest;
      const responseText = JSON.parse(response.response);
      console.log('get: HTTPMethod');
      console.log(typeof response.response);
      return StatusNot200(response.status, responseText);
    } catch (error: any) {
      console.error(error.message);
      return false;
    }
  };

  put: HTTPMethod = async (url, options = {}) => {
    try {
      const response = (await this.request(url, { ...options, method: METHODS.PUT }, options?.timeout)) as XMLHttpRequest;
      const responseText = JSON.parse(response.response);
      return StatusNot200(response.status, responseText);
    } catch (error: any) {
      console.error(error.message);
      return false;
    }
  };

  post: HTTPMethod = async (url, options = {}) => {
    try {
      const response = (await this.request(url, { ...options, method: METHODS.POST }, options?.timeout)) as XMLHttpRequest;
      const responseText = JSON.parse(response.response);
      console.log('post JSON.parse', responseText);
      return StatusNot200(response.status, responseText);
    } catch (error: any) {
      console.error(error.message);
      return false;
    }
  };

  delete: HTTPMethod = async (url: string, options?: Ioptions) => {
    try {
      const response = (await this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout)) as XMLHttpRequest;
      const responseText = JSON.parse(response.response);
      return StatusNot200(response.status, responseText);
    } catch (error: any) {
      console.error(error.message);
      return false;
    }
  };
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

      if (headers && Object.keys(headers).length) {
        Object.keys(headers).forEach((header) => {
          xhr.setRequestHeader(header, headers[header]);
        });
      }

      // eslint-disable-next-line func-names
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
