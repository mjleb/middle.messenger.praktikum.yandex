import tpl from './modalAddUser.tpl';
import Link from '../nav/link';
import Form from '../forms/form/form';
import Input from '../forms/input';
import Button from '../forms/button/button';
import { IProps } from '@/types';
import Block from '@/services/block';
import { submitForm } from '@/services/helpers';
import store, { StoreEvents } from '@/services/store';
import chatController from '@/controllers/chat';
import { alertClean, alertMessage, cleanInput, validatorRules } from '@/services/validator';

export default class ModalAddUser extends Block {
  constructor(props: IProps) {
    super('div', props);

    if (!this.element) {
      return;
    }

    this.element.classList.add('modal');
    this.element.setAttribute('id', props.id);

    store.on(StoreEvents.Updated, () => {
      const chatActiveId = store.getState()?.chatActiveId;
      this.setProps({ chatActiveId });
      const searchUsers = store.getState()?.searchusers;
      if (searchUsers) {
        const count = searchUsers.length;
        console.log('count', count);
        this.setProps({ resulttext: `Найдено ${count}` });
      }
    });
  }

  init() {
    this.children.body = new Form({
      id: 'form-user-add',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          label: 'Логин пользователя',
          name: 'login',
          id: 'form-user-add-id-login',
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
          label: 'Найти',
          id: 'form-user-add-submit',
          type: 'submit',
          events: {
            async click(e: any) {
              e.preventDefault();
              // -----------------
              const formname = e.target.id.replace('-submit', '');
              let checkValid = true;
              if (validatorRules('form-user-add-id-login', 'login')) {
                checkValid = false;
              }
              if (checkValid) {
                const data = submitForm(formname);
                try {
                  await chatController.searchUser(data);
                  // console.log(res);
                  // alertMessage('success', formname, 'нейдено');
                } catch (error: any) {
                  alertMessage('error', formname, error.message);
                }
              }
              // -----------------
            },
          },
        }),
      ],
    });
  }

  componentDidUpdate(): boolean {
    // const chatActiveId = store.getState()?.chatActiveId;
    // ----------------------------
    const searchUsers = store.getState()?.searchusers;
    this.children.result = [];

    if (searchUsers) {
      searchUsers.forEach((item: any) => {
        console.log('messages item', item);

        this.children.result.push(
          new Link({
            id: item.id,
            name: item.login,
            class: 'a',
            icon: 'add_circle',
            events: {
              async click() {
                alertClean('form-user-add');
                try {
                  await chatController.addChatUser(item.id);
                  store.set('searchusers', []);
                  cleanInput('id-login');
                  alertMessage('success', 'form-user-add', `Пользователь  ${item.login} добавлен в чат`);
                } catch (error: any) {
                  alertMessage('error', 'form-user-add', error.message);
                }
              },
            },
          }),
        );
      });
    }

    return true;
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
