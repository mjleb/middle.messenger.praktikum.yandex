import Block from './block';
import { Indexed } from '../types';
import store, { StoreEvents } from './store';

export default function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  // используем class expression
  return class extends Component {
    constructor(props: any) {
      super('div', { ...props, ...mapStateToProps(store.getState()) });

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
/*
export default function connect(
  Component: typeof Block,
  mapStateToProps: (state: Indexed) => Indexed,
) {
  // используем class expression
  return class extends Component {
    constructor(props: any) {
      devLog('connect  Component constructor', 'start');
      // сохраняем начальное состояние
      let state = mapStateToProps(store.getState());
      super({ ...props, ...state });
      devLog('connect  Component constructor authController', 'authCheck');

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // при обновлении получаем новое состояние
        const newState = mapStateToProps(store.getState());
        devLog('connect newState', JSON.stringify(newState));

        // если что-то из используемых данных поменялось, обновляем компонент
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }

        // не забываем сохранить новое состояние
        state = newState;
      });
      authController.authCheck();
    }
  } as unknown as typeof Block;
}
*/

export function connectChatProps(state: Indexed) {
  return {
    warning: state.warning,
    error: state.error,
    succsess: state.succsess,
    user: state.user,
    chat: state.chat,
    search: state.search,
  };
}
export function connectProps(state: Indexed) {
  return {
    warning: state.warning,
    error: state.error,
    succsess: state.succsess,
    user: state.user,
  };
}
