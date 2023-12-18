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
import { alertClean, alertMessage, alertSuccess, validatorRules } from '@/services/validator';

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
          id: 'id-first_name',
          type: 'text',
          required: true,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-string'],
          label: 'Фамилия',
          name: 'second_name',
          id: 'id-second_name',
          type: 'text',
          required: true,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-email'],
          label: 'Почта',
          name: 'email',
          id: 'id-email',
          type: 'email',
          required: true,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-phone'],
          label: 'Телефон',
          name: 'phone',
          id: 'id-phone',
          type: 'text',
          required: true,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
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
        new Input({
          class: ['validator-password'],
          label: 'Пароль (ещё раз)',
          name: 'password2',
          id: 'id-password2',
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
          id: 'sign-up',
          type: 'submit',
          events: {
            async click(e: any) {
              e.preventDefault();
              const formname = 'form-sign-up';

              alertClean(formname);
              let FlagError = true;
              if (validatorRules('id-first_name', 'string')) {
                FlagError = false;
              }
              if (validatorRules('id-second_name', 'string')) {
                FlagError = false;
              }
              if (validatorRules('id-email', 'email')) {
                FlagError = false;
              }
              if (validatorRules('id-phone', 'phone')) {
                FlagError = false;
              }
              if (validatorRules('id-login', 'login')) {
                FlagError = false;
              }
              if (validatorRules('id-password', 'password')) {
                FlagError = false;
              }
              if (validatorRules('id-password2', 'password')) {
                FlagError = false;
              }
              const data = submitForm(formname);
              if (data.password != data.password2) {
                FlagError = false;
                alertMessage('error', formname, 'Пароли не совпадают');
              }
              console.log(FlagError);
              if (FlagError) {
                const res = await authController.signup({ first_name: data.first_name, second_name: data.second_name, login: data.login, email: data.email, password: data.password, phone: data.phone });
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
