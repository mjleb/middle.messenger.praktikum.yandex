import tpl from './signup.tpl';
import links from '../links.json';
import Block from '@/services/block';
import Input from '@/components/forms/input/index';
import Button from '@/components/forms/button/button';
import Form from '@/components/forms/form/form';
import { submitForm } from '@/services/helpers';
import authController from '@/controllers/auth';
import { Indexed } from '@/types';
import connect from '@/services/connect';
import Link from '@/components/nav/link';
import router from '@/services/router';

class PageSignUp extends Block {
  constructor() {
    super('section', {
      links,
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      password: '',
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
          value: this.props.password,
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
          value: this.props.password,
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
              const data = submitForm('form-sign-up');
              const result = authController.signup(data);
              console.log('form-sign-up result', result);
            },
          },
        }),
      ],
    });
    this.children.linkLogin = new Link({
      name: 'Вход',
      events: {
        click() {
          router.go(links.login);
        },
      },
    });
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}

function Props(state: Indexed) {
  return {
    user: state.user,
    warning: state.warning,
    error: state.error,
    succsess: state.succsess,
  };
}

export default connect(PageSignUp, Props);
