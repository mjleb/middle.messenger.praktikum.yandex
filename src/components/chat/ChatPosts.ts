import Block from '@/services/block.ts';
import tpl from './ChatPosts.tpl.ts';
import { IProps } from '@/types.ts';

export default class ChatPosts extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('posts');
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
