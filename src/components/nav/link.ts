import Block from '@/services/block';
import tpl from '@/components/nav/link.tpl';
import { IProps } from '@/types';

export default class Link extends Block {
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('link');
    if (props.class) {
      this.element.classList.add(props.class);
    }
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
