import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';
import { tpl as tplModal } from '../modal/modal.tpl.ts';
import Form from '../forms/form/form.ts';
import Input from '../forms/input/index.ts';
import Button from '../forms/button/button.ts';
import { submitForm } from '@/services/http.ts';

export default class ModalAvatar extends Block {
  constructor(props: IProps) {
    super('div', props);

    if (!this.element) {
      return;
    }

    this.element.classList.add('modal');
    this.element.setAttribute('id', props.id);
  }

  init() {
    this.children.body = new Form({
      id: 'form-file-avatar',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          label: '',
          name: 'photo',
          id: 'photo',
          type: 'file',
          required: true,
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
      ],
      buttons: [
        new Button({
          label: 'Поменять',
          id: 'send',
          type: 'submit',
          events: {
            click(e: any) {
              e.preventDefault();
              submitForm('form-file-avatar');
            },
          },
        }),
      ],
    });
  }

  render() {
    return this.compile(tplModal, { ...this.props });
  }
}
/*
export default class ModalAvatar extends Block {
  constructor(props: IProps) {
    super('div', props);

    if (!this.element) {
      return;
    }

    this.element.classList.add('modal');
    this.element.setAttribute('id', props.id);
  }
  init() {
    this.children.body = new Form({
      id: 'form-file-avatar',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          label: '',
          name: 'avatar',
          id: 'avatar',
          type: 'file',
          status: '',
          value: '',
          placeholder: '',
          helpingText: '',
        }),
      ],
      buttons: [
        new Button({
          label: 'Отправить',
          id: 'send',
          type: 'submit',
          events: {
            click(e: any) {
              e.preventDefault();
            },
          },
        }),
      ],
    });
  }
  render() {
    return this.compile(tplModal, { ...this.props });
  }
}
*/
