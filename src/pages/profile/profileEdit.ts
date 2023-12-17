import tpl from '@/pages/profile/profileEdit.tpl';
import Block from '@/services/block';
import Avatar from '@/components/profile/avatar';
import ModalAvatar from '@/components/profile/avatarmodal';
import { modalClose, modalOpen } from '@/components/modal/modal';
import Button from '@/components/forms/button/button';
import FormProfile from '@/components/forms/form/formProfile';
import Input from '@/components/forms/input';
import { submitForm } from '@/services/helpers';
import connect, { connectProps } from '@/services/connect';
import profileController from '@/controllers/profile';
import { userDefault } from '@/shared/models';
import links from '@/pages/links.json';
import Link from '@/components/nav/link';
import router from '@/services/router';
import store from '@/services/store';

class PageProfileEdit extends Block {
  constructor() {
    super('section', { user: store.getState().user ? store.getState().user : userDefault });
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
    this.children.form = new FormProfile({
      id: 'form-profile',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          class: ['validator-email'],
          label: 'Почта',
          name: 'email',
          id: 'email',
          type: 'email',
          required: false,
          status: '',
          value: this.props.user.email,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-login'],
          label: 'Логин',
          name: 'login',
          id: 'login',
          type: 'text',
          required: false,
          status: '',
          value: this.props.user.login,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-string'],
          label: 'Имя',
          name: 'first_name',
          id: 'first_name',
          type: 'text',
          required: false,
          status: '',
          value: this.props.user.first_name,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-string'],
          label: 'Фамилия',
          name: 'second_name',
          id: 'second_name',
          type: 'text',
          required: false,
          status: '',
          value: this.props.user.second_name,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-string'],
          label: 'Имя в чате',
          name: 'display_name',
          id: 'display_name',
          type: 'text',
          required: false,
          status: '',
          value: this.props.user.display_name,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-phone'],
          label: 'Телефон',
          name: 'phone',
          id: 'phone',
          type: 'text',
          required: false,
          status: '',
          value: this.props.user.phone,
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
              const data = submitForm('form-profile');
              profileController.profileSave(data);
            },
          },
        }),
      ],
    });
    this.children.linkProfile = new Link({
      name: 'Профиль',
      events: {
        click() {
          router.go(links.profile);
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

  componentDidUpdate(): boolean {
    this.init();
    return true;
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}

export default connect(PageProfileEdit, connectProps);
