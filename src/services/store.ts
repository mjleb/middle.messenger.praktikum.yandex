import EventBus from './event-bus';
import { set } from './helpers';
import { Indexed } from '@/types';

// eslint-disable-next-line no-shadow
export enum StoreEvents {
  Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private state: Indexed = {};

  static __instance: any;

  constructor() {
    // devLog('Store constructor', 'start');
    super();
    if (Store.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Store.__instance;
    }
    Store.__instance = this;
  }

  public getState(): any {
    // devLog('getState', JSON.stringify(this.state));
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    // метод EventBus
    this.emit(StoreEvents.Updated);
  }
}
const store = new Store();
export default store;
