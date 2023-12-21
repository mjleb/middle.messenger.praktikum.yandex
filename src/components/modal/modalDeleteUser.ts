import tpl from './modalDeleteUser.tpl';
import Link from '../nav/link';
import Block from '@/services/block';
import { IProps } from '@/types';
import store, { StoreEvents } from '@/services/store';
import chatController from '@/controllers/chat';
import { alertClean, alertMessage } from '@/services/validator';

export default class ModalDeleteUser extends Block {
  constructor(props: IProps) {
    super('div', props);

    if (!this.element) {
      return;
    }
    this.setProps({ id: 'user-delete' });

    this.element.classList.add('modal');
    this.element.setAttribute('id', props.id);

    store.on(StoreEvents.Updated, () => {
      const chatActiveId = store.getState()?.chatActiveId;
      this.setProps({ chatActiveId });
      const usersinchat = store.getState()?.usersinchat;
      if (usersinchat) {
        const count = usersinchat.length;
        console.log('count', count);
        this.setProps({ resulttext: `Найдено ${count}` });
      }
    });
  }

  init() {
    this.children.result = [];
  }

  componentDidUpdate(): boolean {
    // const chatActiveId = store.getState()?.chatActiveId;

    // ----------------------------
    const searchUsers = store.getState()?.usersinchat;
    this.children.result = [];

    if (searchUsers) {
      searchUsers.forEach((item: any) => {
        console.log('messages item', item);

        this.children.result.push(
          new Link({
            id: item.id,
            name: item.login,
            class: 'a',
            icon: 'cancel',
            events: {
              async click() {
                alertClean('user-delete');
                try {
                  await chatController.deleteChatUser(item.id);
                  await chatController.usersInChat();
                  store.set('searchusers', []);
                  alertMessage('success', 'user-delete', `Пользователь ${item.login} успешно удален`);
                } catch (error: any) {
                  alertMessage('error', 'user-delete', error.message);
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
