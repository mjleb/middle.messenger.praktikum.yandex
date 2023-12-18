import tpl from './login.tpl';
import links from '../links.json';
import Block from '@/services/block';
import Input from '@/components/forms/input/index';
import Button from '@/components/forms/button/button';
import Form from '@/components/forms/form/form';
import { submitForm } from '@/services/helpers';
import authController from '@/controllers/auth';
import connect, { connectProps } from '@/services/connect';
import Link from '@/components/nav/link';
import router from '@/services/router';
import { validatorRules } from '@/services/validator';

class PageLogin extends Block {
  constructor() {
    super('section', {});

    this.element.classList.add('auth');
  }

  init() {
    this.children.form = new Form({
      id: 'form-sign-in',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          class: ['validator-login'],
          label: 'Логин',
          name: 'login',
          id: 'id-login',
          type: 'text',
          required: true,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-password'],
          label: 'Пароль',
          name: 'password',
          id: 'id-password',
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
          label: 'Войти',
          id: 'sign-in',
          type: 'submit',
          events: {
            click(e: any) {
              e.preventDefault();
              if (!validatorRules('id-login', 'login') && !validatorRules('id-password', 'password')) {
                const data = submitForm('form-sign-in');
                console.log(data);
                authController.login(data);
              }
            },
          },
        }),
      ],
    });
    this.children.linkSignUp = new Link({
      name: 'Нет аккаунта?',
      events: {
        click() {
          router.go(links.signup);
        },
      },
    });
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}

export default connect(PageLogin, connectProps);
