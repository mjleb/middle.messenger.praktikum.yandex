import Block from '@/services/block';
import tpl from './form.tpl';

import { IProps } from '@/types';

export default class Form extends Block {
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
