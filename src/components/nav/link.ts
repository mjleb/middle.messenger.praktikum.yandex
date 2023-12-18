import Block from '@/services/block';
import tpl from '@/components/nav/link.tpl';
import { IProps } from '@/types';
import authController from '@/controllers/auth';
import router from '@/services/router';
import links from '@/pages/links.json';

export default class Link extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('link');
    if (props.class) {
      this.element.classList.add(props.class);
    }
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
// ------------------------
export const boxLinkLogout = new Link({
  name: 'Выйти',
  events: {
    async click() {
      await authController.logout();
    },
  },
});
// ------------------------
export const boxLinkProfilePassword = new Link({
  name: 'Изменить пароль',
  events: {
    click() {
      router.go(links.profilepassword);
    },
  },
});
// -----------------------
export const boxLinkProfileEdit = new Link({
  settings: { withInternalID: true },
  name: 'Изменить данные',
  events: {
    click() {
      router.go(links.profileedit);
    },
  },
});
