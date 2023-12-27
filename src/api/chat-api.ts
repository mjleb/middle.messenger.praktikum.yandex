import BaseAPI from './base-api';
import { IProps } from '@/types';
import HTTPTransport from '@/services/http';

const chatAPIInstance = new HTTPTransport();

export default class ChatAPI extends BaseAPI {
  static apiPath = `${BaseAPI.apiUrl}/chats`;

  get(data?: Record<string, any>) {
    return chatAPIInstance.get(`${ChatAPI.apiPath}/`, { data });
  }

  getChatToken(chatId: number) {
    return chatAPIInstance.post(`${ChatAPI.apiPath}/token/${chatId}`);
  }

  create(title: string) {
    return chatAPIInstance.post(`${ChatAPI.apiPath}/`, { data: { title } });
  }

  delete(id: number) {
    return chatAPIInstance.delete(`${ChatAPI.apiPath}/`, { data: { id } });
  }

  addChatUser(userId: number, chatId: number) {
    return chatAPIInstance.put(`${ChatAPI.apiPath}/users`, {
      data: { users: [userId], chatId },
    });
  }

  usersInChat(chatId: number) {
    return chatAPIInstance.get(`${ChatAPI.apiPath}/${chatId}/users/`);
  }

  deleteChatUser(userId: number, chatId: number) {
    return chatAPIInstance.delete(`${ChatAPI.apiPath}/users`, {
      data: { users: [userId], chatId },
    });
  }

  saveAvatar(data: IProps) {
    return chatAPIInstance.put(`${ChatAPI.apiPath}/avatar`, { data, type: 'form' });
  }
}
