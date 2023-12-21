import tpl from './avatarphoto.tpl.ts';
import Block from '@/services/block.ts';
import store, { StoreEvents } from '@/services/store.ts';
import { userDefault } from '@/shared/models.ts';
import { IProps } from '@/types.ts';

export default class AvatarPhoto extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }

    this.setProps(props);
    this.setProps({ user: store.getState().user ? store.getState().user : userDefault });

    // this.element.setAttribute('id', props.id);
    this.element.classList.add('avatar');

    store.on(StoreEvents.Updated, () => {
      const user = store.getState()?.user;
      this.setProps({ user });
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
