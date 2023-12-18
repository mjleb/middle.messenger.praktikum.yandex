import WSS from '@/services/ws';
import AuthAPI from '@/api/auth-api';
import ChatAPI from '@/api/chat-api';
import UserAPI from '@/api/user-api';
import store from '@/services/store';
import { IChat } from '@/types';

type IgetChatToken = { token: string };

class ChatController {
  authApi = new AuthAPI();

  userApi = new UserAPI();

  chatApi = new ChatAPI();

  async create(title: string) {
    try {
      const response = await this.chatApi.create(title);
      console.log('create chat', response);
      return response;
    } catch (e: any) {
      console.error(e.message);
      return e.message;
    }
  }

  async chatList() {
    try {
      const response = (await this.chatApi.get()) as XMLHttpRequest;
      // console.log('chatList response', response);
      store.set('chats', response);
      return response;
    } catch (e: any) {
      console.error(e.message);
      return e.message;
    }
  }

  async searchChats(data: Record<string, any>) {
    try {
      let title = {};
      if (data.search != '') {
        title = { title: data.search };
      }
      const response = await this.chatApi.get(title);
      store.set('chats', response);
      return response;
    } catch (e: any) {
      console.error(e.message);
    }
    return true;
  }

  async searchUser(data: Record<string, any>) {
    try {
      const response = await this.userApi.search({ login: data.login });
      store.set('searchusers', response);
      return response;
    } catch (e: any) {
      console.error(e.message);
    }
    return true;
  }

  async addChatUser(userId: number) {
    try {
      const chatActiveId = store?.getState()?.chatActiveId;
      if (!chatActiveId) {
        return;
      }
      await this.chatApi.addChatUser(userId, chatActiveId);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async usersInChat() {
    try {
      const chatActiveId = store?.getState()?.chatActiveId;
      if (!chatActiveId) {
        return;
      }
      const response = await this.chatApi.usersInChat(chatActiveId);
      store.set('usersinchat', response);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async deleteChatUser(userId: number) {
    try {
      const chatActiveId = store?.getState()?.chatActiveId;
      if (!chatActiveId) {
        return;
      }
      await this.chatApi.deleteChatUser(userId, chatActiveId);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  getChatTitle(chatId: number) {
    const chats = store?.getState()?.chats;
    const currentChat = chats.filter((chat: IChat) => Number(chat.id) === Number(chatId));
    store.set('chatTitle', currentChat[0].title);
  }

  async getChatToken(chatActiveId: number) {
    try {
      const response: IgetChatToken = (await this.chatApi.getChatToken(chatActiveId)) as IgetChatToken;
      // console.log('getChatToken', chatActiveId, response);
      if (!response.token) {
        console.warn('there is no chat token');
        return false;
      }
      store.set('token', response.token);
      return response.token;
    } catch (e: any) {
      console.error(e.message);
      return false;
    }
  }

  async sendMessage(message: string) {
    try {
      await WSS.sendMessage(message);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async connect(chatActiveId: number) {
    try {
      const token = await this.getChatToken(chatActiveId);
      // console.log('token', token);

      if (!token) {
        console.warn('there is no chat token');
        return;
      }

      WSS.connect(chatActiveId, token);
      this.getChatTitle(chatActiveId);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async disconnect() {
    await WSS.disconnect();
  }
}

export default new ChatController();
