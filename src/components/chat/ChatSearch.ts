import Button from '../forms/button/button.ts';
import tpl from './ChatSearch.tpl.ts';
import Block from '@/services/block.ts';
import store, { StoreEvents } from '@/services/store.ts';
import { IProps } from '@/types.ts';
import chatController from '@/controllers/chat.ts';

export default class ChatSearch extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('search');
    store.on(StoreEvents.Updated, () => {
      const search = store.getState()?.search;
      this.setProps({ search });
    });
  }

  init() {
    this.children.usernew = [];
  }

  componentDidUpdate(): boolean {
    const state = store?.getState();
    const search = state?.search;

    if (!search) {
      return false;
    }
    this.children.usernew = [];
    search.forEach((item: any) => {
      this.children.usernew.push(
        new Button({
          label: 'Добавить ' + item.login,
          id: item.id,
          events: {
            click(e: any) {
              e.preventDefault();
              console.log('Button', e, item.id);

              chatController.profileSave(data);
            },
          },
        }),
      );
    });
    return true;
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
