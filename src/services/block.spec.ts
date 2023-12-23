import Link from '../components/nav/link';
import Block from './block';
import { expect } from 'chai';

const tpl = `
  <div>
    {{{title}}}
  </div>
`;

class ComponentTest extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super('div', {});
  }

  init() {
    this.children.title = new Link({
      name: 'Test',
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
const testBlock = new ComponentTest();

describe('Test class Block', () => {
  it('The "render" method.', () => {
    expect((testBlock as unknown as Block).getContent()?.innerHTML === 'Test');
  });

  it('The "render" method. Render with props', () => {
    ((testBlock as unknown as Block).children.title as Link).setProps({
      name: 'Some other test',
    });

    expect((testBlock as unknown as Block).getContent()?.innerHTML === 'Some other test');
  });
});
