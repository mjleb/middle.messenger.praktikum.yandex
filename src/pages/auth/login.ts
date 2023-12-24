import tpl from './login.tpl';
import links from '../links.json' assert { type: 'json' };
import Block from '../../services/block';
import Input from '../../components/forms/input/index';
import Button from '../../components/forms/button/button';
import Form from '../../components/forms/form/form';
import { submitForm } from '../../services/helpers';
import authController from '../../controllers/auth';
import connect, { connectProps } from '../../services/connect';
import Link from '../../components/nav/link';
import router from '../../services/router';
import { alertClean, alertMessage, alertSuccess, validatorRules } from '../../services/validator';

function validatorPageLogin(formname: string): boolean {
  console.log('formname', formname);
  alertClean(formname);
  let FlagError = true;
  if (validatorRules('form-login-id-login', 'login')) {
    //  console.log('validatorRules login', validatorRules('form-login-id-login', 'login'));
    FlagError = false;
  }
  if (validatorRules('form-login-id-password', 'password')) {
    // console.log('validatorRules password', validatorRules('form-login-id-password', 'password'));
    FlagError = false;
  }
  // console.log('validatorRules', FlagError);
  return FlagError;
}

class PageLogin extends Block {
  constructor() {
    super('section', {});
    // -------
    const props = {
      id: 'login',
      formname: `form-login`,
    };
    this.setProps(props);
    // -------
    this.element.classList.add('auth');
    this.element.setAttribute('id', props.id);
  }

  init() {
    this.children.form = new Form({
      id: this.props.formname,
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
          id: 'form-login-id-login',
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
          id: 'form-login-id-password',
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
          id: `${this.props.formname}-submit`,
          type: 'submit',
          events: {
            async click(e: any) {
              e.preventDefault();
              // -----------------
              const formname = e.target.id.replace('-submit', '');
              const checkValid = validatorPageLogin(formname);
              if (checkValid) {
                const data = submitForm(formname);
                try {
                  const res = await authController.login(data);
                  console.log(res);
                  alertSuccess(formname, `Ok`);
                } catch (error: any) {
                  alertMessage('error', formname, error.message);
                }
              }
              // -----------------
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
    this.init();
    return true;
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}

export default connect(PageLogin, connectProps);
