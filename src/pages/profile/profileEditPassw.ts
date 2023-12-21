import tpl from './profileEditPassw.tpl';
import Block from '@/services/block';
import ModalAvatar from '@/components/modal/modalAvatar';
import { modalOpen } from '@/components/modal/modal';
import Button from '@/components/forms/button/button';
import FormProfile from '@/components/forms/form/formProfile';
import Input from '@/components/forms/input';
import { submitForm } from '@/services/helpers';
import links from '@/pages/links.json';
import Link from '@/components/nav/link';
import router from '@/services/router';
import { alertClean, alertMessage, alertSuccess, validatorRules } from '@/services/validator';
import profileController from '@/controllers/profile';
import connect, { connectProps } from '@/services/connect';
import AvatarPhoto from '@/components/profile/avatarphoto';
import authController from '@/controllers/auth';

function validatorPagePassword(formname: string): boolean {
  alertClean(formname);
  let FlagError = true;
  if (validatorRules('id-oldPassword', 'password')) {
    FlagError = false;
  }
  if (validatorRules('id-newPassword', 'password')) {
    FlagError = false;
  }
  const data = submitForm(formname);
  if (data.newPassword != data.newPassword2) {
    FlagError = false;
    alertMessage('error', formname, 'Пароли не совпадают');
  }
  if (data.oldPassword == '' || data.newPassword == '') {
    FlagError = false;
  }
  console.log(FlagError);
  return FlagError;
}

class PageProfileEditPassw extends Block {
  constructor() {
    super('section', {});
    // -------
    const props = {
      id: 'profile-password',
      formname: `form-password`,
    };
    this.setProps(props);
    // -------
    this.element.classList.add('profile');
    this.element.setAttribute('id', props.id);
  }

  init() {
    this.children.linkChat = new Link({
      id: 'tochat-passw',
      class: 'a',
      icon: 'arrow_back',
      events: {
        click() {
          router.go(links.chat);
        },
      },
    });
    this.children.modal = new ModalAvatar({
      id: `modal-avatar-${this.props.id}`,
    });
    this.children.avatar = new AvatarPhoto({
      id: `avatar-${this.props.id}`,
      events: {
        click(e: any) {
          e.preventDefault();
          console.log(`${e.target.id}`);
          modalOpen(`${e.target.id}`);
        },
      },
    });
    this.children.form = new FormProfile({
      id: this.props.formname,
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          class: ['validator-password'],
          label: 'Старый пароль',
          name: 'oldPassword',
          id: 'id-oldPassword',
          type: 'password',
          required: true,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-password'],
          label: 'Новый пароль',
          name: 'newPassword',
          id: 'id-newPassword',
          type: 'password',
          required: true,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-password'],
          label: 'Повторите новый пароль',
          name: 'newPassword2',
          id: 'id-newPassword2',
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
          label: 'Сохранить',
          id: `${this.props.formname}-submit`,
          type: 'submit',
          events: {
            async click(e: any) {
              e.preventDefault();
              // -----------------
              const formname = e.target.id.replace('-submit', '');
              const checkValid = validatorPagePassword(formname);
              if (checkValid) {
                const data = submitForm(formname);
                try {
                  const res = await profileController.password({ oldPassword: data.oldPassword, newPassword: data.newPassword });
                  console.log(res);
                  alertSuccess(formname, `Данные успешно обновлены`);
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
    this.children.linkProfile = new Link({
      name: 'Профиль',
      events: {
        click() {
          router.go(links.profile);
        },
      },
    });
    this.children.linkProfileEdit = new Link({
      settings: { withInternalID: true },
      name: 'Изменить данные',
      events: {
        click() {
          router.go(links.profileedit);
        },
      },
    });
    this.children.linkLogout = new Link({
      name: 'Выйти',
      events: {
        async click() {
          await authController.logout();
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

export default connect(PageProfileEditPassw, connectProps);
