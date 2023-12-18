import store from '@/services/store';
import chatController from '@/controllers/chat';
import { fJSONparse } from './helpers';

export class WS {
  static basePath = 'wss://ya-praktikum.tech/ws/chats';

  static connTimerDelay = 10000;

  _connTimer;

  _chatId: number | null;

  _socket: WebSocket | null;

  constructor() {
    this._connTimer = store?.getState()?.connTimer;
    this._chatId = null;
    this._socket = null;
  }

  _setTimer(): void {
    const connTimer = setInterval(() => {
      if (!this._socket) {
        return;
      }
      if (this._socket.readyState !== 1) {
        return;
      }
      this._socket.send(
        JSON.stringify({
          type: 'ping',
        }),
      );
    }, WS.connTimerDelay);
    store.set('connTimer', connTimer);
  }

  _getMessages() {
    if (!this._socket) {
      return;
    }
    this._socket.send(JSON.stringify({ type: 'get old', content: '0' }));
  }

  async sendMessage(message: string) {
    if (!this._socket) {
      return;
    }
    this._socket.send(JSON.stringify({ type: 'message', content: message }));
  }

  async connect(chatActiveId: number, token: string) {
    if (this._socket) {
      await this.disconnect();
    }

    const userId = store?.getState()?.user?.id;
    this._socket = new WebSocket(`${WS.basePath}/${userId}/${chatActiveId}/${token}`);
    this._chatId = Number(chatActiveId);

    this._socket.addEventListener('open', () => {
      console.log('Websocket connection open');
      // get old messages
      this._getMessages();
    });

    this._socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Websocket connection clean');
      } else {
        console.warn('Websocket connection  closed  ');
      }

      // console.log(`Code: ${event.code}`);
      // remove WS connection timer if exists to avoid pinging multiples chats
      clearInterval(this._connTimer);
      store.set('connTimer', null);
    });

    this._socket.addEventListener('message', async (event) => {
      // console.log('event.data', event.data);

      const data = fJSONparse(event.data);

      if (data.type === 'pong') {
        return;
      }
      if (data.type === 'user connected') {
        console.log(`user connected: ${data.content}`);
        return;
      }
      if (Array.isArray(data)) {
        store.set('messages', data.reverse());
      } else {
        const messages: any = store?.getState()?.messages;
        messages.push({ ...data, chat_id: this._chatId });
        store.set('messages', messages);
        // console.log('ws store.set');
      }
      store.set('chatActiveId', this._chatId);
      // fetch chats to update the list view
      // const chats = new ChatsController();
      await chatController.chatList();
      // scroll to the bottom of messages
      const messagesWrap = document.querySelector('.messages');
      if (!messagesWrap) {
        return;
      }
      messagesWrap.scrollTop = messagesWrap.scrollHeight;
    });

    this._socket.addEventListener('error', (event) => {
      console.log('Error', event);
    });

    this._setTimer();
  }

  async disconnect() {
    if (!this._socket) {
      return false;
    }
    if (this._socket.readyState !== 1) {
      return false;
    }
    this._socket.close();
    return true;
  }
}

export default new WS();
