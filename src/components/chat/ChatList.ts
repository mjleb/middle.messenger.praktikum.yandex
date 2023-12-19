import Button from '../forms/button/button';
import Input from '../forms/input';
import Form from '../forms/form/form';
import { Modal, modalClose, modalOpen } from '../modal/modal';
import Block from '@/services/block';
import { getChatDatetime, getTimestamp, isEmpty, submitForm } from '@/services/helpers';
import chatController from '@/controllers/chat';
import tpl from '@/components/chat/ChatList.tpl';
import store, { StoreEvents } from '@/services/store';
import ChatItem from '@/components/chat/chat';
import Link from '@/components/nav/link';
import router from '@/services/router';
import links from '@/pages/links.json';
import { IChat } from '@/types';
import { alertClean, alertMessage, cleanInput, validatorRules } from '@/services/validator';

export default class ChatList extends Block {
  constructor() {
    super('div', {});
    if (!this.element) {
      return;
    }
    // -------
    const props = {
      id: 'chat-list',
      formname: `form-search`,
    };

    this.setProps(props);
    // -------
    this.element.classList.add('menu');
    this.element.setAttribute('id', props.id);
    // -------
    store.on(StoreEvents.Updated, () => {
      const chats = store.getState()?.chats;
      this.setProps({ chats });
      const search = store.getState()?.search;
      this.setProps({ search });
      // console.log('search', search);
    });
    chatController.chatList();
  }

  init() {
    this.children.modalNew = new Modal({
      id: 'modal-new',
      h1: 'Добавление чата',
      buttonClose: new Button({
        id: `modal-new-close`,
        label: 'X',
        type: 'submit',
        class: 'button-close',
        events: {
          click(e: any) {
            e.preventDefault();
            const idmodal = e.target.id.replace('-close', '');
            const tagEdit = document.getElementById(idmodal);
            if (tagEdit) tagEdit.style.display = 'none';
          },
        },
      }),
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
            id: 'form-new-id-title',
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
            id: 'form-new-submit',
            type: 'submit',
            events: {
              async click(e: any) {
                e.preventDefault();

                // -----------------
                const formname = e.target.id.replace('-submit', '');
                alertClean(formname);
                const data = submitForm(formname);
                let FlagError = true;
                if (validatorRules('form-new-id-title', 'message')) {
                  FlagError = false;
                }
                if (FlagError) {
                  try {
                    await chatController.create(data.title);
                    chatController.chatList();
                    alertMessage('success', formname, 'Чат добавлен');
                    modalClose('modal-new');
                    cleanInput('form-new-id-title');
                    alertClean(formname);
                  } catch (error: any) {
                    alertMessage('error', formname, error.message);
                  }
                }
                // -----------------
              },
            },
          }),
        ],
      }),
    });
    /*
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
    */
    this.children.linkProfile = new Link({
      name: 'Профиль >>',
      class: 'a',
      events: {
        click() {
          router.go(links.profile);
        },
      },
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
          id: 'id-search',
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
          label: '<span class="material-symbols-outlined" id="form-search-submit">search</span>',
          id: 'form-search-button',
          type: 'submit',
          events: {
            async click(e: any) {
              e.preventDefault();

              // -----------------
              const formname = e.target.id.replace('-submit', '');
              alertClean(formname);

              const data = submitForm(formname);

              try {
                const res = await chatController.searchChats(data);

                if (isEmpty(res)) {
                  alertMessage('error', formname, 'не найдено');
                }
                // alertMessage('success', formname, `Ok`);
              } catch (error: any) {
                alertMessage('error', formname, error.message);
              }
              // -----------------
            },
          },
        }),
      ],
    });
    this.children.chats = [];
    this.children.addnewchat = new Button({
      label: '+ Новый чат',
      id: 'button-add-newchat',
      type: 'submit',
      class: 'p-10',
      events: {
        click(e: any) {
          e.preventDefault();
          modalOpen('new');
        },
      },
    });
  }

  componentDidUpdate(): boolean {
    const state = store?.getState();
    const chats: IChat[] = state?.chats;
    const chatActiveId: any = store.getState()?.chatActiveId;

    if (!chats) {
      return false;
    }
    this.children.chats = [];
    if (chats) {
      // console.log('chats list', chats);
      chats.forEach((chat: any) => {
        const active: boolean = !!(chatActiveId == chat.id);
        const timestamp = getTimestamp(chat?.last_message?.time);
        const date = timestamp ? getChatDatetime(timestamp) : null;
        // console.log('chat', chat);
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
                // console.log('click chatId store', store.getState());
                await chatController.connect(chat.id);
                // console.log('messages', store.getState()?.messages);
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
