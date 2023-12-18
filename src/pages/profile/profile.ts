import tpl from './profile.tpl';
import Block from '@/services/block';
import Avatar from '@/components/profile/avatar';
import ModalAvatar from '@/components/profile/avatarmodal';
import { modalClose, modalOpen } from '@/components/modal/modal';
import Button from '@/components/forms/button/button';
import connect, { connectProps } from '@/services/connect';
import links from '@/pages/links.json';
import Link, { boxLinkLogout, boxLinkProfileEdit, boxLinkProfilePassword } from '@/components/nav/link';
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
    this.children.linkChat = new Link({
      id: 'tochat',
      class: 'a',
      icon: 'arrow_back',
      events: {
        click() {
          router.go(links.chat);
        },
      },
    });
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
    this.children.linkProfileEdit = boxLinkProfileEdit;
    this.children.linkProfilePassword = boxLinkProfilePassword;
    this.children.linkLogout = boxLinkLogout;
  }

  render() {
    this.dispatchComponentDidMount();
    this.init();
    return this.compile(tpl, { ...this.props });
  }
}

export default connect(PageProfile, connectProps);
