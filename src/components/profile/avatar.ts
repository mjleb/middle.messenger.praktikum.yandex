import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';
import tpl from './avatar.tpl.ts';
import AvatarPhoto from './avatarphoto.ts';
import { modalOpen } from '../modal/modal.ts';

export default class Avatar extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('avatar');
  }

  init() {
    this.children.photo = new AvatarPhoto({
      id: 'avatar-photo',
      name: 'И',
      events: {
        click(e: any) {
          e.preventDefault();
          modalOpen('modal-avatar');
          console.log('modalOpen');
        },
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
