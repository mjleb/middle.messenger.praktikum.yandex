import tpl from './modalAvatar.tpl.ts';
import Form from '../forms/form/form.ts';
import Input from '../forms/input/index.ts';
import Button from '../forms/button/button.ts';
import { modalClose, modalOpen } from './modal.ts';
import AvatarPhoto from '../profile/avatarphoto.ts';
import { submitFormFile } from '@/services/helpers';
import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';
import chatController from '@/controllers/chat';
import { alertClean, alertMessage, alertSuccess, validatorRules } from '@/services/validator.ts';
import authcontroller from '@/controllers/auth.ts';
import store, { StoreEvents } from '@/services/store.ts';

function validatorAvatarModal(formname: string): boolean {
  alertClean(formname);
  let FlagError = true;
  if (validatorRules(`${formname}-id-avatar-file`, 'message')) {
    FlagError = false;
  }
  return FlagError;
}

/**
 * Класс ModalAvatar
 * @constructor
 * @param {string} parentid - id для чего модальное окно
 */
/** modalOpen(parentid) */
/** modalClose(parentid) */
export default class ModalAvatarChat extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    // -------
    props.h1 = 'Загрузите файл';
    props.formname = `form-file-chat-${props.id}`;
    this.setProps(props);
    // -------
    this.element.classList.add('modal');
    this.element.setAttribute('id', props.id);
    // ------
    store.on(StoreEvents.Updated, () => {
      const chatActiveId = store?.getState()?.chatActiveId;
      this.setProps({ chatActiveId });
    });
  }

  init() {
    this.children.buttonClose = new Button({
      id: `${this.props.id}-close`,
      label: 'X',
      type: 'submit',
      class: 'button-close',
      events: {
        click(e: any) {
          e.preventDefault();
          const idmodal = e.target.id.replace('-close', '');
          const tagEdit = document.getElementById(idmodal);
          if (tagEdit) tagEdit.style.display = 'none';
        },
      },
    });
    this.children.body = new Form({
      id: this.props.formname,
      events: {
        click() {
          // e.preventDefault();
        },
      },
      inputs: [
        new Input({
          name: 'avatar',
          id: `${this.props.formname}-id-avatar-file`,
          type: 'file',
          required: true,
        }),
        new Input({
          name: 'chatId',
          id: `${this.props.formname}-id-chatId`,
          type: 'hidden',
          required: true,
          value: this.props.chatActiveId,
        }),
      ],

      buttons: [
        new Button({
          label: 'Поменять',
          id: `${this.props.formname}-submit`,
          type: 'submit',
          events: {
            async click(e: any) {
              e.preventDefault();

              const formname = e.target.id.replace('-submit', '');
              const checkValid = validatorAvatarModal(formname);
              if (checkValid) {
                const data = submitFormFile(formname);
                try {
                  console.log('file load data', data);
                  console.log('formname', formname);
                  const res = await chatController.chatAvatarSave(data);
                  authcontroller.getUserId();
                  console.log('file load', res);
                  alertSuccess(formname, `Данные успешно обновлены`);
                  modalClose('modal-avatar-chat');
                  chatController.chatList();
                } catch (error: any) {
                  alertMessage('error', formname, error.message);
                }
              }
            },
          },
        }),
      ],
    });
    this.children.photo = new AvatarPhoto({
      id: `${this.props.id}-photo`,
      events: {
        click(e: any) {
          e.preventDefault();
          modalOpen(e.target.id.replace('-photo', ''));
          console.log('modalOpen');
        },
      },
    });
  }

  render() {
    this.init();
    return this.compile(tpl, { ...this.props });
  }
}
