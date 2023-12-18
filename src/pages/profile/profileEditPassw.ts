import tpl from './profileEditPassw.tpl';
import Block from '@/services/block';
import Avatar from '@/components/profile/avatar';
import ModalAvatar from '@/components/profile/avatarmodal';
import { modalClose, modalOpen } from '@/components/modal/modal';
import Button from '@/components/forms/button/button';
import FormProfile from '@/components/forms/form/formProfile';
import Input from '@/components/forms/input';
import { submitForm } from '@/services/helpers';
import authController from '@/controllers/auth';
import links from '@/pages/links.json';
import Link, { boxLinkLogout, boxLinkProfile, boxLinkProfileEdit } from '@/components/nav/link';
import router from '@/services/router';

export default class PageProfileEditPassw extends Block {
  constructor() {
    super('section', {});

    this.element.classList.add('profile');
    authController.getUserId();
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
      name: 'Иван',
      events: {
        click(e: any) {
          e.preventDefault();
          modalOpen('modal-avatar');
          console.log('modalOpen');
        },
      },
    });
    this.children.form = new FormProfile({
      id: 'form-profile',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          class: ['validator-password'],
          label: 'Старый пароль',
          name: 'oldPassword',
          id: 'oldPassword',
          type: 'text',
          required: false,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-password'],
          label: 'Новый пароль',
          name: 'newPassword',
          id: 'newPassword',
          type: 'text',
          required: false,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-password'],
          label: 'Повторите новый пароль',
          name: 'newPassword2',
          id: 'newPassword2',
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
          label: 'Сохранить',
          id: 'save',
          type: 'submit',
          events: {
            click(e: any) {
              e.preventDefault();
              submitForm('form-profile');
            },
          },
        }),
      ],
    });
    this.children.linkProfile = boxLinkProfile;
    this.children.linkProfileEdit = boxLinkProfileEdit;
    this.children.linkLogout = boxLinkLogout;
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
