import { RequestOptions, JsonObject } from '@/types.ts';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

function queryStringify(data: string) {
  // Можно делать трансформацию GET-параметров в отдельной функции
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
type Ioptions = {
  dataGet: any;
  method: string;
  timeout: number;
};
export class HTTPTransport {
  get = (url: string, options: Ioptions) => {
    const { dataGet } = options;
    let urlnew: string = url;
    if (dataGet) {
      urlnew = `${url}?${queryStringify(dataGet)}`;
    }
    return this.request(urlnew, { ...options, method: METHODS.GET }, options.timeout);
  };

  put = (url: string, options: RequestOptions = {}) => {
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  post = (url: string, options: RequestOptions = {}) => {
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  delete = (url: string, options: RequestOptions = {}) => {
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  // PUT, POST, DELETE

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: any, timeout = 5000) => {
    const { method, data } = options;
    console.log(timeout);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      if (method === METHODS.POST || method === METHODS.PUT) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(method === METHODS.POST || method === METHODS.PUT ? JSON.stringify(data) : data);
      }
    });
  };
}

export function submitForm(id: string): void {
  const form = document.getElementById(id) as HTMLFormElement;

  if (!form) {
    console.log('Форма не найдена');
    return;
  }

  // Создаем объект FormData, который автоматически соберет все данные формы
  const formData = new FormData(form);

  // Преобразуем данные в JSON
  const jsonData: JsonObject = {};

  formData.forEach((value: any, key: string) => {
    jsonData[key] = value;
  });

  // Выводим результат в консоль (вместо этого вы можете отправить данные на сервер)
  console.log(jsonData);
}
