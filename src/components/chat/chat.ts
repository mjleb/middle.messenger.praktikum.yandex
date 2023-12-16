import Block from '@/services/block';
import { IChat, IChatProps, Indexed } from '@/types.ts';
import tpl from '@/components/chat/chat.tpl';
import store, { StoreEvents } from '@/services/store';
import connect from '@/services/connect';

export default class ChatItem extends Block {
  constructor(props: IChatProps) {
    super('div', props);

    if (!this.element) {
      return;
    }
    // this.element.classList.add();

    this.element.classList.add('user');

    this.element.setAttribute('id', this.props.id);
    if (this.props.active != false) {
      this.element.classList.add('active');
    }
    /*
    store.on(StoreEvents.Updated, () => {
      const chatActiveId = store.getState()?.chatActiveId;
      this.setProps({ active: true });
      this.element.classList.add('active');
      console.log('chatActiveId=', chatActiveId, 'this.props.id', this.props.id);
    });
    */
  }
  /*
  componentDidUpdate(): boolean {
    const chatActiveId = store.getState()?.chatActiveId;
    if (chatActiveId == this.props.id) {
      this.setProps({ active: true });
      this.element.classList.add('active');
      console.log('active = ok', this.props.id, this.element.classList);
    } else {
      this.setProps({ active: null });
      this.element.classList.remove('active');
      console.log('active = off', this.props.id);
    }

    return true;
  }
  */

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
