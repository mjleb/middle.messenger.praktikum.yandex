import tpl from './avatarphoto.tpl.ts';
import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';

export default class AvatarPhoto extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }

    this.element.setAttribute('id', props.id);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
