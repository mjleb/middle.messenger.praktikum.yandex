import tpl from './alert.tpl.ts';
import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';

export default class Alert extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('alert');
    this.element.setAttribute('id', props.id);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
