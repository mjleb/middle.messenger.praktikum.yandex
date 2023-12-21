import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';
import tpl from './button.tpl.ts';

export default class Button extends Block {
  /** JSDoc

   */
  constructor(props: IProps) {
    super('button', props);
    if (!this.element) {
      return;
    }
    if (props.class) this.element.classList.add(props.class);
    this.element.setAttribute('id', props.id);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
