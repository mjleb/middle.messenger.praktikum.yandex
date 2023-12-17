import WS from '@/services/ws';
import AuthAPI from '@/api/auth-api';
import ChatAPI from '@/api/chat-api';
import UserAPI from '@/api/user-api';
import store from '@/services/store';
import { IChat } from '@/types';

class ChatController {
  authApi = new AuthAPI();

  userApi = new UserAPI();

  chatApi = new ChatAPI();

  async create(title: string) {
    try {
      const response = (await this.chatApi.create(title)) as XMLHttpRequest;
      const responseText = JSON.parse(response.response);
      if (response.status !== 200) {
        const { reason } = responseText;
        console.warn(`Oops, something went wrong: ${reason}`);

        return false;
      }
      console.log('create chat', responseText);
      return responseText;
    } catch (e: any) {
      console.error(e.message);
    }
    return true;
  }

  async chatList() {
    try {
      const response = (await this.chatApi.get()) as XMLHttpRequest;
      const responseText = JSON.parse(response.response);
      console.log(responseText);
      if (response.status !== 200) {
        const { reason } = responseText;
        console.warn(`Wrong: ${reason}`);

        return false;
      }
      if (responseText) {
        store.set('chats', responseText);
      } else {
        store.set('chats', null);
      }
    } catch (e: any) {
      console.error(e.message);
    }
    return true;
  }

  async searchChats(data: Record<string, any>) {
    try {
      console.log('ChatController searchUser', data);
      let title = {};
      if (data.search != '') {
        title = { title: data.search };
      }
      const response = (await this.chatApi.get(title)) as XMLHttpRequest;
      const responseText = JSON.parse(response.response);
      console.log('responseText', responseText);
      if (response.status !== 200) {
        const { reason } = responseText;
        console.warn(`Wrong: ${reason}`);
        return false;
      }

      store.set('chats', responseText);
      return responseText;
    } catch (e: any) {
      console.error(e.message);
    }
    return true;
  }

  async searchUser(data: Record<string, any>) {
    try {
      console.log('ChatController searchUser', data);
      const response = (await this.userApi.search({ login: data.login })) as XMLHttpRequest;
      const responseText = JSON.parse(response.response);
      console.log('responseText', responseText);
      if (response.status !== 200) {
        const { reason } = responseText;
        console.warn(`Wrong: ${reason}`);
        return false;
      }
      store.set('searchusers', responseText);
      return responseText;
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
      const response = (await this.chatApi.usersInChat(chatActiveId)) as XMLHttpRequest;
      const responseText = JSON.parse(response.response);
      console.log('responseText', responseText);
      if (response.status !== 200) {
        const { reason } = responseText;
        console.warn(`Wrong: ${reason}`);
      }
      store.set('usersinchat', responseText);
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
      const response = (await this.chatApi.getChatToken(chatActiveId)) as XMLHttpRequest;
      const responseText = JSON.parse(response.response);
      if (response.status !== 200) {
        const { reason } = responseText;
        console.warn(`wrong: ${reason}`);
        return false;
      }
      if (!responseText.token) {
        console.warn('there is no chat token');
        return false;
      }
      store.set('token', responseText.token);
      return responseText.token;
    } catch (e: any) {
      console.error(e.message);
      return false;
    }
  }

  async sendMessage(message: string) {
    try {
      await WS.sendMessage(message);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async connect(chatActiveId: number) {
    try {
      const token = await this.getChatToken(chatActiveId);

      if (!token) {
        console.warn('there is no chat token');
        return;
      }

      WS.connect(chatActiveId, token);
      this.getChatTitle(chatActiveId);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async disconnect() {
    await WS.disconnect();
  }
}

export default new ChatController();
