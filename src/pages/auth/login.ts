import Block from '@/services/block';
import Input from '@/components/forms/input/index';
import Button from '@/components/forms/button/button';
import tpl from './login.tpl';
import Form from '@/components/forms/form/form';
import { submitForm } from '@/services/http';

export default class PageLogin extends Block {
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
          id: 'login',
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
          id: 'password',
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
              submitForm('form-sign-in');
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
