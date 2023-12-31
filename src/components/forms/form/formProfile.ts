import tpl from './formProfile.tpl';
import Block from '@/services/block';
import { IProps } from '@/types';

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
