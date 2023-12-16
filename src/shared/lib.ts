// Выводит в консоль в режиме разработки
export function devLog(name: string, text: string = '') {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log(name, text);
  }
}

// USE  CatchELog(e,url);
export function CatchELog(e: any, pageCode: string) {
  if (e instanceof Error) {
    devLog(pageCode, e.message);
  }
}
