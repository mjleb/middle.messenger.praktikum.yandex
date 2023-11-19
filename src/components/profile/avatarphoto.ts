import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';
import tpl from './avatarphoto.tpl.ts';

export default class AvatarPhoto extends Block {
  constructor(props: IProps) {
    super('span', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('notphoto');
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
