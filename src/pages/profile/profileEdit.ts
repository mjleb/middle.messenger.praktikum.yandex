import tpl from '@/pages/profile/profileEdit.tpl';
import Block from '@/services/block';
import ModalAvatar from '@/components/modal/modalAvatar';
import { modalOpen } from '@/components/modal/modal';
import Button from '@/components/forms/button/button';
import FormProfile from '@/components/forms/form/formProfile';
import Input from '@/components/forms/input';
import { submitForm } from '@/services/helpers';
import connect, { connectProps } from '@/services/connect';
import profileController from '@/controllers/profile';
import { userDefault } from '@/shared/models';
import links from '@/pages/links.json';
import Link, { boxLinkChat } from '@/components/nav/link';
import store from '@/services/store';
import { alertClean, alertMessage, alertSuccess, validatorRules } from '@/services/validator';
import AvatarPhoto from '@/components/profile/avatarphoto';
import router from '@/services/router';
import authController from '@/controllers/auth';

function validatorPageProfileEdit(formname: string): boolean {
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
  return FlagError;
}

class PageProfileEdit extends Block {
  constructor() {
    super('section', { user: store.getState().user ? store.getState().user : userDefault });
    // -------
    const props = {
      id: 'profile-edit',
      formname: `form-edit`,
      user: store.getState().user ? store.getState().user : userDefault,
    };
    this.setProps(props);
    // -------
    this.element.classList.add('profile');
    this.element.setAttribute('id', props.id);
  }

  init() {
    this.children.linkChat = boxLinkChat;
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
          id: `${this.props.formname}-submit`,
          type: 'submit',
          events: {
            async click(e: any) {
              e.preventDefault();
              // -----------------
              const formname = e.target.id.replace('-submit', '');
              const checkValid = validatorPageProfileEdit(formname);
              if (checkValid) {
                const data = submitForm(formname);
                try {
                  const res = await profileController.profileSave(data);
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
    this.children.linkProfilePassword = new Link({
      name: 'Изменить пароль',
      events: {
        click() {
          router.go(links.profilepassword);
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

export default connect(PageProfileEdit, connectProps);
