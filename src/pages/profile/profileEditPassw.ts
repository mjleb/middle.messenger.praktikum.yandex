import tpl from './profileEditPassw.tpl';
import Block from '@/services/block';
import Avatar from '@/components/profile/avatar';
import ModalAvatar from '@/components/profile/avatarmodal';
import { modalClose, modalOpen } from '@/components/modal/modal';
import Button from '@/components/forms/button/button';
import FormProfile from '@/components/forms/form/formProfile';
import Input from '@/components/forms/input';
import { submitForm } from '@/services/helpers';
import links from '@/pages/links.json';
import Link, { boxLinkLogout, boxLinkProfile, boxLinkProfileEdit } from '@/components/nav/link';
import router from '@/services/router';
import { alertClean, alertMessage, alertSuccess, validatorRules } from '@/services/validator';
import profileController from '@/controllers/profile';
import connect, { connectProps } from '@/services/connect';

class PageProfileEditPassw extends Block {
  constructor() {
    super('section', {});
    this.element.classList.add('profile');
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
      id: 'modal-avatar-passw',
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
              modalClose('modal-avatar-passw');
            },
          },
        }),
      ],
    });
    this.children.avatar = new Avatar({
      id: 'avatar-passw',
      events: {
        click(e: any) {
          e.preventDefault();
          modalOpen('modal-avatar-passw');
        },
      },
    });
    this.children.form = new FormProfile({
      id: 'form-password',
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
          id: 'save',
          type: 'submit',
          events: {
            async click(e: any) {
              e.preventDefault();
              alertClean('form-password');
              let FlagError = true;

              if (validatorRules('id-oldPassword', 'password')) {
                FlagError = false;
              }
              const data = submitForm('form-password');
              if (data.newPassword != data.newPassword2) {
                FlagError = false;
                alertMessage('error', 'form-password', 'Пароли не совпадают');
              }
              if (data.oldPassword == '' || data.newPassword == '') {
                FlagError = false;
              }
              if (FlagError) {
                const res = await profileController.password({ oldPassword: data.oldPassword, newPassword: data.newPassword });
                if (res == 'OK') {
                  alertSuccess('form-password', `Данные успешно обновлены`);
                } else {
                  alertMessage('error', 'form-password', res);
                }
              }
            },
          },
        }),
      ],
    });
    this.children.linkProfile = boxLinkProfile;
    this.children.linkProfileEdit = boxLinkProfileEdit;
    this.children.linkLogout = boxLinkLogout;
  }

  componentDidUpdate(): boolean {
    alertClean('form-password');
    this.init();
    return true;
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}

export default connect(PageProfileEditPassw, connectProps);
