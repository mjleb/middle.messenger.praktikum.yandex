import Block from '@/services/block';
import tpl from './chatUser.tpl';
import { IProps } from '@/types.ts';

export default class ChatUsers extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('users');
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
