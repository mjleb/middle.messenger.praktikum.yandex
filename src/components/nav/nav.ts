import Block from '@/services/block';
import tpl from '@/components/nav/nav.tpl';
import connect, { connectProps } from '@/services/connect';

class PageNav extends Block {
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

export default connect(PageNav, connectProps);
