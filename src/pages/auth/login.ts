import tpl from './login.tpl';

import links from '../links.json';
import Block from '@/services/block';
import Input from '@/components/forms/input/index';
import Button from '@/components/forms/button/button';
import Form from '@/components/forms/form/form';
import { submitForm } from '@/services/helpers';
import authController from '@/controllers/auth';

import connect, { connectProps } from '@/services/connect';
import { Indexed } from '@/types';
import { devLog } from '@/shared/lib';

class PageLogin extends Block {
  constructor() {
    devLog('PageLogin constructor', '');
    /*
    (async () => {
      const auth = await authController.authCheck();
      devLog('PageLogin auth', auth);
    })();
    */

    super('section', {
      links,
      login: '',
      password: '',
    });

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
      ],
      buttons: [
        new Button({
          label: 'Войти',
          id: 'sign-in',
          type: 'submit',
          events: {
            click(e: any) {
              e.preventDefault();
              const data = submitForm('form-sign-in');
              authController.login(data);
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

export default connect(PageLogin, connectProps);
