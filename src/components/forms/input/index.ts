import Block from '@/services/block.ts';
import { IProps } from '@/types.ts';
import tpl from './input.tpl.ts';

export default class Input extends Block {
  /** JSDoc
   * @param {object} props
   *  @param {string} label
   *  @argument {boolean} required
   * type
   * class status
   * name
   * value
   * placeholder
   * helpingText
   */
  constructor(props: IProps) {
    super('div', props);
    if (!this.element) {
      return;
    }
    this.element.classList.add('group-input');
    this.element.setAttribute('id', props.id);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
