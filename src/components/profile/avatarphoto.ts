import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';
import tpl from './avatarphoto.tpl.ts';

export default class AvatarPhoto extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    /*this.element.classList.add('notphoto'); // notphoto photo*/
    this.element.setAttribute('id', props.id);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
