export interface JsonObject {
  [key: string]: any;
}

export interface RequestOptions {
  // Other properties...
  timeout?: number;
}
export type ICallback = (...args: any) => any;
export type IListeners = Record<string, ICallback[]>;
export type IProps = Record<string, any>;
export type ItagEdit = HTMLElement | null;
export type ItextContent = HTMLElement | null;
export type Iobj = {
  class: string;
  pattern: RegExp;
  text: string;
};
