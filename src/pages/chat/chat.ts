import links from '../links.json';
import tpl from './chatpage.tpl';
import Block from '@/services/block';
import Input from '@/components/forms/input/index';
import Button from '@/components/forms/button/button';
import Form from '@/components/forms/form/form';
import { submitForm } from '@/services/helpers';
import ChatList from '@/components/chat/ChatList';
import ChatMessages from '@/components/chat/ChatMessages';
import chatController from '@/controllers/chat';
import { Modal, modalClose, modalOpen } from '@/components/modal/modal';
import store, { StoreEvents } from '@/services/store';
/*
const APIusers = [
  {
    active: false,
    img: '',
    name: 'Киноклуб',
    date: '15:12',
    text: 'Друзья, у меня для вас особенный выпуск новостей! для вас особенный выпуск',
    number_messages: 4,
  },
  {
    active: true,
    img: '',
    name: 'тет-а-теты',
    date: 'Ср',
    text: 'И Human Interface Guidelines и Material Design рекомендуют',
    numbermessages: null,
  },
];
*/
const APImessages = [
  {
    self: false,
    text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    date: '12:00',
  },
  {
    self: true,
    text: 'Круто!',
    date: '19:33',
    status: 'read',
  },
];
const APIuserName = 'тет-а-теты';
// status: got,send, read
export default class PageChat extends Block {
  constructor() {
    super('section', { user: APIuserName, links });

    this.element.classList.add('chat');
    /*
    store.on(StoreEvents.Updated, () => {
      const chats = store.getState()?.chats;
      this.setProps({ chats });
      const search = store.getState()?.search;
      this.setProps({ search });
      console.log('search', search);
    });
    chatController.chatList();
    */
  }

  init() {
    this.children.chats = new ChatList();
    this.children.messages = new ChatMessages();
    //this.children.posts = new ChatPosts({ posts: APImessages });
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
