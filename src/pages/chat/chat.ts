import Block from '@/services/block';
import Input from '@/components/forms/input/index';
import Button from '@/components/forms/button/button';
import tpl from './chat.tpl';
import Form from '@/components/forms/form/form';
import { submitForm } from '@/services/http';
import ChatUsers from '@/components/chat/chatUser';
import ChatPosts from '@/components/chat/ChatPosts';

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
    super('section', { user: APIuserName });

    this.element.classList.add('chat');
  }

  init() {
    this.children.formSearch = new Form({
      id: 'form-search',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          label: '',
          name: 'search',
          id: 'search',
          type: 'text',
          required: false,
          status: '',
          value: '',
          placeholder: ' Поиск',
          helpingText: '',
        }),
      ],
      buttons: [
        new Button({
          label: '<i class="fa fa-search" aria-hidden="true"></i> ',
          id: 'search',
          type: 'submit',
          events: {
            click(e: any) {
              e.preventDefault();
              submitForm('form-search');
            },
          },
        }),
      ],
    });
    this.children.users = new ChatUsers({ users: APIusers });
    this.children.posts = new ChatPosts({ posts: APImessages });
    this.children.formMessage = new Form({
      id: 'form-message',
      events: {
        click(e: any) {
          e.preventDefault();
        },
      },
      inputs: [
        new Input({
          class: ['validator-message'],
          label: '',
          name: 'message',
          id: 'message',
          type: 'text',
          required: true,
          status: '',
          value: '',
          placeholder: 'Сообщение',
          helpingText: '',
        }),
      ],
      buttons: [
        new Button({
          label: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
          id: 'send',
          type: 'submit',
          events: {
            click(e: any) {
              e.preventDefault();
              submitForm('form-message');
            },
          },
        }),
      ],
    });
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
