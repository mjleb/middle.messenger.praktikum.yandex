import tpl from './ChatMessages.tpl.ts';
import ModalAddUser from '../modal/modalAddUser.ts';
import ModalDeleteUser from '../modal/modalDeleteUser.ts';
import { modalClose, modalOpen } from '../modal/modal.ts';
import MessageItem from './message.ts';
import Form from '../forms/form/form.ts';
import Input from '../forms/input/index.ts';
import Button from '../forms/button/button.ts';
import Block from '@/services/block.ts';
import { IMessageApi } from '@/types.ts';
import { getChatDatetime, getTimestamp, submitForm } from '@/services/helpers.ts';
import store, { StoreEvents } from '@/services/store.ts';
import chatController from '@/controllers/chat';
import Link from '@/components/nav/link.ts';
import { cleanInput, validatorMessage } from '@/services/validator.ts';

export default class ChatMessages extends Block {
  constructor() {
    super('div', {});
    if (!this.element) {
      return;
    }
    this.element.classList.add('context');
    store.on(StoreEvents.Updated, () => {
      const state = store?.getState();
      const chatActiveId = store.getState()?.chatActiveId;
      this.setProps({ chatActiveId });
      console.log('chatActiveId', chatActiveId);
      const chatTitle = state?.chatTitle;
      this.setProps({ chatTitle });
    });
  }

  init() {
    this.children.modalAdd = new ModalAddUser({
      id: 'modal-useradd',
      buttons: [
        new Button({
          label: 'X',
          id: 'modal-useradd',
          type: 'submit',
          class: 'button-close',
          events: {
            click(e: any) {
              e.preventDefault();
              store.set('searchusers', []);
              modalClose('modal-useradd');
            },
          },
        }),
      ],
      h1: 'Добавление пользователя',
    });
    this.children.modalDelete = new ModalDeleteUser({
      id: 'modal-userdelete',
      buttons: [
        new Button({
          label: 'X',
          id: 'modal-userdelete',
          type: 'submit',
          class: 'button-close',
          events: {
            click(e: any) {
              e.preventDefault();
              modalClose('modal-userdelete');
            },
          },
        }),
      ],
      h1: 'Удаление пользователя',
    });
    this.children.useradd = new Link({
      id: 'adduser',
      name: 'Добавить пользователя',
      class: 'a',
      icon: 'add_circle',
      events: {
        click() {
          console.log('Добавить пользователя');
          modalOpen('modal-useradd');
        },
      },
    });
    this.children.userdelete = new Link({
      id: 'userdelete',
      name: 'Удалить пользователя',
      class: 'a',
      icon: 'cancel',
      events: {
        async click() {
          console.log('Удалить пользователя');
          await chatController.usersInChat();
          modalOpen('modal-userdelete');
        },
      },
    });
    this.children.messages = [];
    this.children.formMessage = new Form({
      id: 'form-message',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          label: '',
          name: 'message',
          id: 'id-message',
          type: 'text',
          required: true,
          status: '',
          value: '',
          placeholder: 'Сообщение',
          helpingText: '',
        }),
      ],
      buttons: [
        new Button({
          label: '<span class="material-symbols-outlined">send</span>',
          id: 'send',
          type: 'submit',
          events: {
            async click(e: any) {
              e.preventDefault();
              if (!validatorMessage('id-message')) {
                const data = submitForm('form-message');
                await chatController.sendMessage(data.message);
                cleanInput('id-message');
              }
            },
          },
        }),
      ],
    });
  }

  componentDidUpdate(): boolean {
    const state = store?.getState();
    const chatActiveId = state?.chatActiveId;
    const messages = state?.messages;

    // --------------------------------
    if (!chatActiveId) {
      return false;
    }
    this.children.messages = [];

    if (messages) {
      messages.forEach((item: IMessageApi) => {
        const timestamp = getTimestamp(item?.time);
        const date = getChatDatetime(timestamp);
        console.log('messages item', item);
        this.children.messages.push(
          new MessageItem({
            user: item.user,
            time: date,
            id: item.id,
            chat_id: item.chat_id,
            content: item.content,
            file: item.file,
            is_read: item.is_read,
            type: item.type,
            user_id: item.user_id,
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
