import tpl from './formProfile.tpl';
import Block from '@/services/block';
import store, { StoreEvents } from '@/services/store';
import { IProps } from '@/types';
import { connectProps } from '@/services/connect';

export default class FormProfile extends Block {
  constructor(props: IProps) {
    super('form', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('form');
    this.element.setAttribute('id', props.id);
    this.element.setAttribute('action', '#');
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
