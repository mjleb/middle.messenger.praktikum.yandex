import Block from '@/services/block';
import { IProps } from '@/types.ts';
import tpl from './formProfile.tpl';

export default class FormProfile extends Block {
  constructor(props: IProps) {
    super('form', props);

    if (!this.element) {
      return;
    }

    this.element.classList.add('form');
    this.element.setAttribute('id', props.id);
    this.element.setAttribute('action', '#');
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
