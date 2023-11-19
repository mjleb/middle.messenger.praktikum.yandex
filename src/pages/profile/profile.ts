import Block from '@/services/block';
import tpl from './profile.tpl';
import Avatar from '@/components/profile/avatar';
import ModalAvatar from '@/components/profile/avatarmodal';
import { modalClose, modalOpen } from '@/components/modal/modal';
import Button from '@/components/forms/button/button';

export default class PageProfile extends Block {
  constructor() {
    super('section', {
      id: 'profile',
      email: 'pochta@yandex.ru',
      login: 'ivanivanov',
      first_name: 'Иван',
      second_name: 'Иванов',
      display_name: 'Иван',
      phone: '+7 (909) 967 30 30',
    });

    this.element.classList.add('profile');
  }

  init() {
    this.children.modal = new ModalAvatar({
      id: 'modal-avatar',
      h1: 'Загрузите файл',
      buttons: [
        new Button({
          label: 'X',
          id: 'avatar',
          type: 'submit',
          class: 'button-close',
          events: {
            click(e: any) {
              e.preventDefault();
              modalClose('modal-avatar');
            },
          },
        }),
      ],
    });
    this.children.avatar = new Avatar({
      id: 'avatar',
      name: 'Иван',
      events: {
        click(e: any) {
          e.preventDefault();
          modalOpen('modal-avatar');
          console.log('modalOpen');
        },
      },
    });
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
