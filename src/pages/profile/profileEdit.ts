import Block from '@/services/block';
import tpl from './profileEdit.tpl';
import Avatar from '@/components/profile/avatar';
import ModalAvatar from '@/components/profile/avatarmodal';
import { modalClose, modalOpen } from '@/components/modal/modal';
import Button from '@/components/forms/button/button';
import FormProfile from '@/components/forms/form/formProfile';
import Input from '@/components/forms/input';
import { submitForm } from '@/services/http';

export default class PageProfileEdit extends Block {
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
          type: 'text',
          required: false,
          status: '',
          value: this.props.email,
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
          value: this.props.login,
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
          value: this.props.first_name,
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
          value: this.props.second_name,
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
          value: this.props.display_name,
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
          value: this.props.phone,
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
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
