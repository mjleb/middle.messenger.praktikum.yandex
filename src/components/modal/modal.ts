import tpl from './modal.tpl';
import Block from '@/services/block';
import { IProps, ItagEdit } from '@/types';

export class Modal extends Block {
  constructor(props: IProps) {
    super('div', props);

    if (!this.element) {
      return;
    }

    this.element.classList.add('modal');
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

export function modalOpen(id: string): void {
  console.log('function modalOpen');
  const tagEdit: ItagEdit = document.getElementById(id);
  if (tagEdit) tagEdit.style.display = 'block';
}
export function modalClose(id: string): void {
  const tagEdit = document.getElementById(id);
  if (tagEdit) tagEdit.style.display = 'none';
}
