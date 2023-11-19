import Block from '@/services/block';
import tpl from './error.tpl';

export default class Page500 extends Block {
  constructor() {
    super('section', { error: 500, text: 'Мы уже фиксим' });
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
