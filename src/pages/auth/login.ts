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
import { alertClean, alertMessage, alertSuccess, validatorRules } from '@/services/validator';

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
            async click(e: any) {
              e.preventDefault();
              const formname = 'form-sign-in';
              alertClean(formname);
              let FlagError = true;
              if (validatorRules('id-login', 'login')) {
                FlagError = false;
              }
              if (validatorRules('id-password', 'password')) {
                FlagError = false;
              }
              if (FlagError) {
                const data = submitForm(formname);
                console.log(data);
                const res = await authController.login(data);
                if (res == 'OK') {
                  alertSuccess(formname, `Данные успешно обновлены`);
                } else {
                  alertMessage('error', formname, res);
                }
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

  componentDidUpdate(): boolean {
    alertClean('form-sign-in');
    return true;
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}

export default connect(PageLogin, connectProps);
