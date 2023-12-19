import tpl from './modal.tpl';
import Block from '@/services/block';
import { IProps, ItagEdit } from '@/types';

export function modalOpen(id: string): void {
  const idmodal = `modal-${id}`;
  const tagEdit: ItagEdit = document.getElementById(idmodal);
  if (tagEdit) tagEdit.style.display = 'block';
}
export function modalClose(id: string): void {
  const idmodal = id.replace('-close', '');
  const tagEdit = document.getElementById(idmodal);
  if (tagEdit) tagEdit.style.display = 'none';
}

/**
 * Класс Modal
 * @init
 * @param {string} parentid - id для чего модальное окно
 */
/** modalOpen(parentid) */
/** modalClose(parentid) */
export class Modal extends Block {
  constructor(props: IProps) {
    super('div', props);
    // props.id = `modal-${props.parentid}`;
    // this.setProps(props);
    this.setProps({ id: `modal-${props.parentid}` });
    if (!this.element) {
      return;
    }
    this.element.classList.add('modal');
    this.element.setAttribute('id', props.id);
  }

  init() {}

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
