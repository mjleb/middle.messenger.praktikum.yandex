import Avatar from './components/profile/avatar';

export interface JsonObject {
  [key: string]: any;
}

export interface RequestOptions {
  timeout?: number;
}
export type ICallback = (...args: any) => any;
export type IListeners = Record<string, ICallback[]>;
export type IProps = Record<string, any> | FormData;
export type ItagEdit = HTMLElement | null;
export type ItextContent = HTMLElement | null;
export type Iobj = {
  class: string;
  pattern: RegExp;
  text: string;
};
export type Indexed<T = unknown> = {
  [key in string]: T;
};
export type Ioptions = {
  data?: IProps;
  headers?: Record<string, string>;
  method?: string;
  type?: string;
  timeout?: number;
};
export type IoptionsData = Ioptions & {
  data: IProps;
};
export type IoptionsRequest = Ioptions & {
  method: string;
};
export type LoginProps = {
  login: string;
  password: string;
};

export type IUser = LoginProps & {
  login: string;
  password: string;
  email: string;
  phone: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
};
export type IAvatarProps = {
  size: string;
  url?: string;
};
export type IMessageLast = {
  user: IUser;
  time: string;
  content: string | any;
  id: number;
};
export type IChat = {
  id: number;
  title: string;
  avatar: string | null;
  created_by: number;
  last_message: IMessageLast;
  unread_count: number;
};
export type IChatDetails = {
  datetime: string | null;
  lastMessage: string | null;
  own: boolean;
};

export type IChatProps = {
  avatar?: Avatar;
  title: string;
  id: number;
  active: boolean;
  datetime?: string | null;
  unread?: number;
  lastMessage?: string | null;
  lastMessageImage?: boolean;
  lastMessageSticker?: boolean;
  own?: boolean;
  events?: Record<string, ICallback>;
};

export type IMessageItem = {
  content: string;
  datetime: string;
  own?: boolean;
};

export type IMessageApi = {
  user: IUser;
  time: string;
  id: number;
  chat_id: number;
  content: string;
  file: null;
  is_read: boolean;
  type: string;
  user_id: number;
};
