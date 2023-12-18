import tpl from '@/pages/profile/profileEdit.tpl';
import Block from '@/services/block';
import Avatar from '@/components/profile/avatar';
import ModalAvatar from '@/components/profile/avatarmodal';
import { modalClose, modalOpen } from '@/components/modal/modal';
import Button from '@/components/forms/button/button';
import FormProfile from '@/components/forms/form/formProfile';
import Input from '@/components/forms/input';
import { submitForm } from '@/services/helpers';
import connect, { connectProps } from '@/services/connect';
import profileController from '@/controllers/profile';
import { userDefault } from '@/shared/models';
import links from '@/pages/links.json';
import Link, { boxLinkLogout, boxLinkProfile, boxLinkProfilePassword } from '@/components/nav/link';
import router from '@/services/router';
import store from '@/services/store';
import { alertClean, alertMessage, alertSuccess, validatorRules } from '@/services/validator';

class PageProfileEdit extends Block {
  constructor() {
    super('section', { user: store.getState().user ? store.getState().user : userDefault });
    this.element.classList.add('profile');
  }

  init() {
    this.children.linkChat = new Link({
      id: 'tochat',
      class: 'a',
      icon: 'arrow_back',
      events: {
        click() {
          router.go(links.chat);
        },
      },
    });
    this.children.modal = new ModalAvatar({
      id: 'modal-avatar',
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
              modalClose('modal-avatar');
            },
          },
        }),
      ],
    });
    this.children.avatar = new Avatar({
      id: 'avatar',
      events: {
        click(e: any) {
          e.preventDefault();
          modalOpen('modal-avatar');
          console.log('modalOpen');
        },
      },
    });
    this.children.form = new FormProfile({
      id: 'form-profile-edit',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          class: ['validator-email'],
          label: 'Почта',
          name: 'email',
          id: 'id-email',
          type: 'email',
          required: true,
          status: '',
          value: this.props.user.email,
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
          value: this.props.user.login,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-string'],
          label: 'Имя',
          name: 'first_name',
          id: 'id-first_name',
          type: 'text',
          required: true,
          status: '',
          value: this.props.user.first_name,
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
          value: this.props.user.second_name,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-string'],
          label: 'Имя в чате',
          name: 'display_name',
          id: 'id-display_name',
          type: 'text',
          required: true,
          status: '',
          value: this.props.user.display_name,
          placeholder: '',
          helpingText: '',
        }),
        new Input({
          class: ['validator-phone'],
          label: 'Телефон',
          name: 'phone',
          id: 'id-phone',
          type: 'text',
          required: false,
          status: '',
          value: this.props.user.phone,
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

              const formname = 'form-profile-edit';
              alertClean(formname);
              let FlagError = true;

              if (validatorRules('id-email', 'email')) {
                FlagError = false;
              }

              if (validatorRules('id-login', 'login')) {
                FlagError = false;
              }
              if (validatorRules('id-first_name', 'string')) {
                FlagError = false;
              }
              if (validatorRules('id-second_name', 'string')) {
                FlagError = false;
              }
              if (validatorRules('id-display_name', 'message')) {
                FlagError = false;
              }
              if (validatorRules('id-phone', 'phone')) {
                FlagError = false;
              }
              console.log(FlagError);
              if (FlagError) {
                const data = submitForm(formname);
                const res = await profileController.profileSave(data);
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
    this.children.linkProfile = boxLinkProfile;
    this.children.linkProfilePassword = boxLinkProfilePassword;
    this.children.linkLogout = boxLinkLogout;
  }

  componentDidUpdate(): boolean {
    alertClean('form-profile-edit');
    this.init();
    return true;
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}

export default connect(PageProfileEdit, connectProps);
