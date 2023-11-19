import Block from '@/services/block';
import tpl from './nav.tpl';

export default class PageNav extends Block {
  constructor() {
    super('section', {});
    if (!this.element) {
      return;
    }
    this.element.classList.add('auth');
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(tpl, { ...this.props });
  }
}
