import tpl from './profile.tpl';
import Block from '@/services/block';
import ModalAvatar from '@/components/modal/modalAvatar';
import connect, { connectProps } from '@/services/connect';
import links from '@/pages/links.json';
import Link from '@/components/nav/link';
import router from '@/services/router';
import store from '@/services/store';
import { userDefault } from '@/shared/models';
import { modalOpen } from '@/components/modal/modal';
import AvatarPhoto from '@/components/profile/avatarphoto';
import authController from '@/controllers/auth';

class PageProfile extends Block {
  constructor() {
    super('section', {
      links,
      user: store.getState().user ? store.getState().user : userDefault,
    });
    // -------
    const props = {
      id: 'profile',
      formname: `form-profile`,
      user: store.getState().user ? store.getState().user : userDefault,
    };
    this.setProps(props);
    // -------
    this.element.classList.add('profile');
    this.element.setAttribute('id', props.id);
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
      id: `modal-avatar-${this.props.id}`,
    });
    this.children.avatar = new AvatarPhoto({
      id: `avatar-${this.props.id}`,
      events: {
        click(e: any) {
          e.preventDefault();
          console.log(`${e.target.id}`);
          modalOpen(`${e.target.id}`);
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
        async click() {
          await authController.logout();
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
