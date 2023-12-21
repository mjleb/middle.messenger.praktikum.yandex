import { isEqual } from './helpers';
import { JsonObject } from '@/types';

function render(query: string, block: any) {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent());
  }
  return root;
}

class Route {
  _pathname: string;

  _blockClass: any;

  _block: any;

  _props: JsonObject;

  constructor(pathname: string, view: any, props: JsonObject) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;
