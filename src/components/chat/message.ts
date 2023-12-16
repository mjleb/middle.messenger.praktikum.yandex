import Block from '@/services/block';
import { IMessageApi, IMessageItem } from '@/types.ts';
import tpl from '@/components/chat/message.tpl';
import store from '@/services/store';

export default class MessageItem extends Block {
  constructor(props: IMessageApi) {
    super('div', props);

    if (!this.element) {
      return;
    }
    this.element.classList.add('post');

    const userSelfId = store.getState()?.user.id;
    if (props.user_id == userSelfId) {
      this.element.classList.add('self');
    }
    //this.element.classList.add('self');

    this.element.setAttribute('id', this.props.id);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
