import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';
import tpl from './avatar.tpl.ts';
import AvatarPhoto from './avatarphoto.ts';
import { modalOpen } from '../modal/modal.ts';
import { userDefault } from '@/shared/models.ts';
import store from '@/services/store';

export default class Avatar extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('avatar');
    this.element.setAttribute('id', props.id);
  }

  init() {
    this.children.photo = new AvatarPhoto({
      id: 'avatar-photo',
      user: store.getState().user ? store.getState().user : userDefault,
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
    this.init();
    return this.compile(tpl, { ...this.props });
  }
}
