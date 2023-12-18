/* eslint-disable operator-linebreak */
// eslint-disable-next-line object-curly-newline
import { IChat, IChatDetails, Indexed, JsonObject } from '@/types';
import store from '@/services/store';
import { devLog } from '@/shared/lib';

//--------------
const isObject = (value: any) =>
  //  implicit-arrow-linebreak
  // eslint-disable-next-line implicit-arrow-linebreak
  typeof value === 'object' && !Array.isArray(value) && value !== null;
//--------------
const isString = (value: unknown) => typeof value === 'string' || value instanceof String;
//--------------
export function isEqual(a: Indexed | any, b: Indexed | any) {
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0, keysA1 = keysA; i < keysA1.length; i++) {
    const key = keysA1[i];
    if (keysB.indexOf(key) === -1 || !isEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}
export function isEmpty(value: any) {
  let result = true;
  const valType: string = typeof value;

  if (valType === 'undefined' || valType === 'boolean' || valType === 'number' || value == '' || value == 0 || value == null) {
    result = true;
  } else {
    if (valType == 'object') {
      if (Object.keys(value).length > 0 || value.size > 0) {
        result = false;
      }
    }
    if (valType == 'Array') {
      if (value.length > 0) {
        result = false;
      }
    }
    if (valType == 'Map') {
      if (value.size > 0) {
        result = false;
      }
    }
    if (valType == 'Set') {
      if (value.size > 0) {
        result = false;
      }
    }
    if (valType == 'string') {
      if (value.length > 0) {
        result = false;
      }
    }
  }

  // console.log(result);
  return result;
}
//--------------

const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  // eslint-disable-next-line no-restricted-syntax
  for (const j in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(j)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    try {
      if (isObject(rhs[j] as Indexed)) {
        rhs[j] = merge(lhs[j] as Indexed, rhs[j] as Indexed);
      } else {
        lhs[j] = rhs[j];
      }
    } catch (e) {
      lhs[j] = rhs[j];
    }
  }
  return lhs;
};

//--------------
export const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
  if (!isObject) {
    return object;
  }
  if (!isString(path)) {
    throw new Error('path must be string');
  }

  const keys = path.split('.');
  const rhs = keys.reduceRight(
    (prev, key) => ({
      [key]: prev,
    }),
    value,
  );

  return merge(object as Indexed, rhs as Indexed);
};

//--------------
export function submitForm(id: string): Record<string, any> {
  const form = document.getElementById(id) as HTMLFormElement;

  if (!form) {
    console.log('Форма не найдена');
    return { status: 'error' };
  }

  // Создаем объект FormData, который автоматически соберет все данные формы
  const formData = new FormData(form);

  // Преобразуем данные в JSON
  const jsonData: JsonObject = {};

  formData.forEach((value: any, key: string) => {
    jsonData[key] = value;
  });

  // Выводим результат в консоль (вместо этого вы можете отправить данные на сервер)
  // console.log(jsonData);

  return jsonData;
}
// =========== avatar
export function submitFormFile(id: string): Record<string, any> {
  const form = document.getElementById(id) as HTMLFormElement;

  if (!form) {
    console.log('Форма не найдена');
    return { status: 'error' };
  }

  // Создаем объект FormData, который автоматически соберет все данные формы
  const formData = new FormData(form);

  return formData;
}

// ================================= Alert

export function messageWarning(response: any) {
  const message = JSON.parse(response);
  const { reason } = message;
  console.warn(`warning: ${reason}`);
  store.set('warning', reason);
  // return reason;
}
export function messageError(e: any) {
  console.error(`error: ${e.message}`);
  store.set('error', e.message);
  // return e.message;
}
export function messageSuccsess(response: any) {
  const message = JSON.parse(response);
  const { reason } = message;
  devLog(`succsess: ${reason}`);
  // return reason;
}

export function cleanAlert() {
  devLog('cleanAlert ', '');
  store.set('error', '');
  store.set('warning', '');
  store.set('succsess', '');
}

// =========================================== Chats
export const getTimestamp = (date: string): number => Date.parse(date);

const isToday = (date: Date): boolean => new Date().toDateString() === date.toDateString();

const getMonthName = (monthNumber: number): string => {
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'];
  return months[monthNumber];
};

const Messagetrim = (message: string): string => {
  const maxLength = 75;
  if (message.length <= maxLength) {
    return message;
  }
  return `${message.substring(0, 75)}...`;
};

const getChatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hoursRaw = date.getHours();
  const hours = hoursRaw ? hoursRaw % 12 : 12;
  const minutes = date.getMinutes();
  const ampm = hoursRaw >= 12 ? 'pm' : 'am';
  if (isToday(date)) {
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}${ampm}`;
  }
  return `${getMonthName(date.getMonth())} ${date.getDate() + 1}, ${date.getFullYear()}`;
};

export const getChatDetails = (chat: IChat): IChatDetails => {
  const timestamp = getTimestamp(chat?.last_message?.time);
  const date = timestamp ? getChatDate(timestamp) : null;
  const lastMessage = chat?.last_message?.content ? Messagetrim(chat.last_message.content) : null;

  const messageOwnerLogin: string = chat?.last_message?.user?.login;
  const currentUserLogin = store?.getState()?.user?.login;

  const own = !!(messageOwnerLogin && messageOwnerLogin === currentUserLogin);

  return {
    datetime: date,
    lastMessage,
    own,
  };
};
export const getChatDatetime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hoursRaw = date.getHours();
  const hours = hoursRaw ? hoursRaw % 12 : 12;
  const minutes = date.getMinutes();
  const ampm = hoursRaw >= 12 ? 'pm' : 'am';
  if (isToday(date)) {
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}${ampm}`;
  }
  return `${getMonthName(date.getMonth())} ${date.getDate() + 1}, ${date.getFullYear()}`;
};

export function fJSONparse(data: any) {
  try {
    const res = JSON.parse(data);
    return res;
  } catch (error: any) {
    return data;
  }
}
