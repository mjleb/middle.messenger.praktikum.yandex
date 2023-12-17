import Button from '../forms/button/button';
import Input from '../forms/input';
import Form from '../forms/form/form';
import { Modal, modalClose, modalOpen } from '../modal/modal';
import ChatSearch from './ChatSearch';
import Block from '@/services/block';
import { getChatDatetime, getTimestamp, submitForm } from '@/services/helpers';
import chatController from '@/controllers/chat';
import tpl from '@/components/chat/ChatList.tpl';
import store, { StoreEvents } from '@/services/store';
import ChatItem from '@/components/chat/chat';

export default class ChatList extends Block {
  constructor() {
    super('div', {});
    if (!this.element) {
      return;
    }
    this.element.classList.add('menu');
    store.on(StoreEvents.Updated, () => {
      const chats = store.getState()?.chats;
      this.setProps({ chats });
      const search = store.getState()?.search;
      this.setProps({ search });
      console.log('search', search);
    });
    chatController.chatList();
  }

  init() {
    this.children.modalNew = new Modal({
      id: 'modal-new',
      buttons: [
        new Button({
          label: 'X',
          id: 'modal-new',
          type: 'submit',
          class: 'button-close',
          events: {
            click(e: any) {
              e.preventDefault();
              modalClose('modal-new');
            },
          },
        }),
      ],
      h1: 'Добавление чата',
      body: new Form({
        id: 'form-new',
        events: {
          click(e: any) {
            e.preventDefault();
          },
        },
        inputs: [
          new Input({
            label: 'Название чата',
            name: 'title',
            id: 'title',
            type: 'text',
            required: false,
            status: '',
            value: '',
            placeholder: '',
            helpingText: '',
          }),
        ],
        buttons: [
          new Button({
            label: 'Добавить',
            id: 'addchatnew',
            type: 'submit',
            events: {
              async click(e: any) {
                e.preventDefault();
                const data = submitForm('form-new');
                const newchat = await chatController.create(data.title);
                // console.log('chat new ', newchat);
                if (newchat.id) {
                  // store.set('chatActiveId', newchat.id);
                }
                chatController.chatList();
                modalClose('modal-new');
              },
            },
          }),
        ],
      }),
    });
    this.children.modalSearch = new Modal({
      id: 'modal-search',
      buttons: [
        new Button({
          label: 'X',
          id: 'modal-search',
          type: 'submit',
          class: 'button-close',
          events: {
            click(e: any) {
              e.preventDefault();
              modalClose('modal-search');
            },
          },
        }),
      ],
      h1: 'Найденые пользователи',
      body: new ChatSearch({
        id: 'searchr',
      }),
    });
    this.children.formSearch = new Form({
      id: 'form-search',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          label: '',
          name: 'search',
          id: 'search',
          type: 'text',
          required: false,
          status: '',
          value: '',
          placeholder: ' Поиск',
          helpingText: '',
        }),
      ],
      buttons: [
        new Button({
          label: '<span class="material-symbols-outlined">search</span>',
          id: 'search',
          type: 'submit',
          events: {
            click(e: any) {
              e.preventDefault();
              const data = submitForm('form-search');
              const search = chatController.searchChats(data);

              console.log('chat search ', search);
              // modalOpen('modal-search');
            },
          },
        }),
      ],
    });
    this.children.chats = [];
    this.children.addnewchat = new Button({
      label: '+ Новый чат',
      id: 'newchat',
      type: 'submit',
      class: 'p-10',
      events: {
        click(e: any) {
          e.preventDefault();
          modalOpen('modal-new');
          console.log('new chat');
        },
      },
    });
  }

  componentDidUpdate(): boolean {
    const state = store?.getState();
    const chats = state?.chats;
    const chatActiveId: any = store.getState()?.chatActiveId;

    if (!chats) {
      return false;
    }
    this.children.chats = [];
    if (chats) {
      chats.forEach((chat: any) => {
        const active: boolean = chatActiveId == chat.id ? true : false;
        const timestamp = getTimestamp(chat?.last_message?.time);
        const date = timestamp ? getChatDatetime(timestamp) : null;
        this.children.chats.push(
          new ChatItem({
            id: chat.id,
            avatar: chat.avatar,
            title: chat.title,
            lastMessage: chat.last_message,
            unread: chat.unread_count ? chat.unread_count : 0,
            datetime: date,
            active,
            events: {
              async click(e) {
                e.preventDefault();
                store.set('chatActiveId', chat.id);
                console.log('click chatId store', store.getState());
                await chatController.connect(chat.id);
                console.log('messages', store.getState()?.messages);
              },
            },
          }),
        );
      });
    }
    return true;
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
