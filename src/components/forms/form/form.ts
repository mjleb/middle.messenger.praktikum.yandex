import { v4 as makeUUID } from 'uuid';
import tpl from './form.tpl';
import Block from '../../../services/block';
import { IProps } from '../../../types';

export default class Form extends Block {
  constructor(props: IProps) {
    super('form', props);
    this.props.formid = `${props.id}-${makeUUID()}`;

    if (!this.element) {
      return;
    }

    this.element.classList.add('form');
    this.element.setAttribute('id', props.id);
    // this.element.setAttribute('action', '#');
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
