import Block from '@/services/block';
import Input from '@/components/forms/input/index';
import Button from '@/components/forms/button/button';
import tpl from './signup.tpl';
import Form from '@/components/forms/form/form';
import { submitForm } from '@/services/http';

export default class PageSignin extends Block {
  constructor() {
    super('section', {
      email: 'pochta@yandex.ru',
      login: 'ivanivanov',
      first_name: 'Иван',
      second_name: 'Иванов',
      display_name: 'Иван',
      phone: '+7 (909) 967 30 30',
    });
    if (!this.element) {
      return;
    }
    this.element.classList.add('auth');
  }

  init() {
    this.children.form = new Form({
      id: 'form-sign-up',
      inputs: [
        new Input({
          class: ['validator-string'],
          label: 'Имя',
          name: 'first_name',
          id: 'first_name',
          type: 'text',
          required: true,
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
          required: true,
          status: '',
          value: this.props.second_name,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-email'],
          label: 'Почта',
          name: 'email',
          id: 'email',
          type: 'email',
          required: true,
          status: '',
          value: this.props.email,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-phone'],
          label: 'Телефон',
          name: 'phone',
          id: 'phone',
          type: 'text',
          required: true,
          status: '',
          value: this.props.phone,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-login'],
          label: 'Логин',
          name: 'login',
          id: 'login',
          type: 'text',
          required: true,
          status: '',
          value: this.props.login,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-password'],
          label: 'Пароль',
          name: 'password',
          id: 'password',
          type: 'password',
          required: true,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-password'],
          label: 'Пароль (ещё раз)',
          name: 'password2',
          id: 'password2',
          type: 'password',
          required: true,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
      ],
      buttons: [
        new Button({
          label: 'Зарегистрироваться',
          id: 'sign-in',
          type: 'submit',
          events: {
            click(e: any) {
              e.preventDefault();
              submitForm('form-sign-up');
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
