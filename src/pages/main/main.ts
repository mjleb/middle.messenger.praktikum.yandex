import tpl from '../errors/error.tpl';
import Block from '@/services/block';

export default class PageMain extends Block {
  constructor() {
    super('section', {});
    if (!this.element) {
      return;
    }
    this.element.classList.add('errors');
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
