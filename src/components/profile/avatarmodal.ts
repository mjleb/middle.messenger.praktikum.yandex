import { v4 as makeUUID } from 'uuid';
import tpl from '../modal/modal.tpl.ts';
import Form from '../forms/form/form.ts';
import Input from '../forms/input/index.ts';
import Button from '../forms/button/button.ts';
import { submitFormFile } from '@/services/helpers';
import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';
import profileController from '@/controllers/profile';

export default class ModalAvatar extends Block {
  constructor(props: IProps) {
    super('div', props);

    if (!this.element) {
      return;
    }

    this.element.classList.add('modal');
    this.element.setAttribute('id', props.id);
    // this.id = `form-file-avatar-${makeUUID()}`;
  }

  init() {
    this.children.body = new Form({
      id: 'form-file-avatar',
      events: {
        click(e: any) {
          //e.preventDefault();
        },
      },
      inputs: [
        new Input({
          name: 'avatar',
          id: 'avatar',
          type: 'file',
          required: true,
        }),
      ],
      buttons: [
        new Button({
          label: 'Поменять',
          id: 'send',
          type: 'submit',
          events: {
            click(e: any) {
              /*e.preventDefault();*/
              const data = submitFormFile('form-file-avatar');
              console.log('file load', data);
              profileController.avatarSave(data);
            },
          },
        }),
      ],
    });
  }

  render() {
    this.init();
    return this.compile(tpl, { ...this.props });
  }
}
