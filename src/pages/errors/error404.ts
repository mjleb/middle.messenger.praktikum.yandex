import Block from '@/services/block';
import tpl from './error.tpl';

export default class Page404 extends Block {
  constructor() {
    super('section', { error: 404, text: 'Не туда попали' });
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
