import tpl from './profile.tpl';
import Block from '@/services/block';
import Avatar from '@/components/profile/avatar';
import ModalAvatar from '@/components/profile/avatarmodal';
import { modalClose, modalOpen } from '@/components/modal/modal';
import Button from '@/components/forms/button/button';
import connect, { connectProps } from '@/services/connect';
import links from '@/pages/links.json';
import Link from '@/components/nav/link';
import router from '@/services/router';
import store from '@/services/store';
import { userDefault } from '@/shared/models';

class PageProfile extends Block {
  constructor() {
    super('section', {
      links,
      user: store.getState().user ? store.getState().user : userDefault,
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
      events: {
        click(e: any) {
          e.preventDefault();
          modalOpen('modal-avatar');
          console.log('modalOpen');
        },
      },
    });
    this.children.linkProfileEdit = new Link({
      settings: { withInternalID: true },
      name: 'Изменить данные',
      events: {
        click() {
          router.go(links.profileedit);
        },
      },
    });
    this.children.linkProfilePassword = new Link({
      name: 'Изменить пароль',
      events: {
        click() {
          router.go(links.profilepassword);
        },
      },
    });
    this.children.linkLogout = new Link({
      name: 'Выйти',
      events: {
        click() {
          router.go(links.logout);
        },
      },
    });
  }

  render() {
    this.dispatchComponentDidMount();
    this.init();
    return this.compile(tpl, { ...this.props });
  }
}

export default connect(PageProfile, connectProps);
