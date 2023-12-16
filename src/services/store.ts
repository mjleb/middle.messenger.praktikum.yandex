import EventBus from './event-bus';
import { set } from './helpers';
import { Indexed } from '@/types';
import { devLog } from '@/shared/lib';

export enum StoreEvents {
  Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  __instance: any;

  private state: Indexed = {};

  constructor() {
    // devLog('Store constructor', 'start');
    super();
    if (Store.__instance) {
      return Store.__instance;
    }
    Store.__instance = this;
  }

  public getState() {
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
