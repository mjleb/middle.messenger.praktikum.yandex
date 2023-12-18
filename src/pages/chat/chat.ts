import tpl from './chatpage.tpl';
import Block from '@/services/block';
import ChatList from '@/components/chat/ChatList';
import ChatMessages from '@/components/chat/ChatMessages';
import store from '@/services/store';

export default class PageChat extends Block {
  constructor() {
    super('section', {});

    this.element.classList.add('chat');
  }

  init() {
    this.children.chats = new ChatList();
    this.children.messages = new ChatMessages();
  }

  componentDidUpdate(): boolean {
    const state = store?.getState();

    const search = state?.search;

    if (!search) {
      return false;
    }
    this.children.modalSearch.setProps(search);
    return true;
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
