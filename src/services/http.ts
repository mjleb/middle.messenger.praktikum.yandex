import router from './router';
import { Ioptions, IoptionsRequest } from '@/types';
import links from '@/pages/links.json';

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

function StatusNot200(status: number, res: any) {
  const path = window.location.pathname;
  try {
    const responseText = JSON.parse(res.response);
    if (status !== 200) {
      const { reason } = responseText;
      console.warn(`Wrong: ${reason}`);
      if (status == 401 && path != `${links.login}` && path != `${links.signup}`) {
        router.go(links.login);
      }
      return reason;
    }
    return responseText;
  } catch (e) {
    return res.response;
  }
}

class HTTPTransport {
  get: HTTPMethod = async (url, options = {}) => {
    try {
      const query = options.data ? `${url}?${queryStringify(options.data)}` : url;
      const response = (await this.request(query, { ...options, method: METHODS.GET }, options.timeout)) as XMLHttpRequest;
      return StatusNot200(response.status, response);
    } catch (error: any) {
      return error;
    }
  };

  put: HTTPMethod = async (url, options = {}) => {
    try {
      const response = (await this.request(url, { ...options, method: METHODS.PUT }, options?.timeout)) as XMLHttpRequest;
      return StatusNot200(response.status, response);
    } catch (error: any) {
      return error;
    }
  };

  post: HTTPMethod = async (url, options = {}) => {
    try {
      const response = (await this.request(url, { ...options, method: METHODS.POST }, options?.timeout)) as XMLHttpRequest;
      return StatusNot200(response.status, response);
    } catch (error: any) {
      return error;
    }
  };

  delete: HTTPMethod = async (url: string, options?: Ioptions) => {
    try {
      const response = (await this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout)) as XMLHttpRequest;
      // const responseText = JSON.parse(response.response);
      return StatusNot200(response.status, response);
    } catch (error: any) {
      return error;
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
