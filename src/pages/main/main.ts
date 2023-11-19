import Block from '@/services/block';
import tpl from '../errors/error.tpl';

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
