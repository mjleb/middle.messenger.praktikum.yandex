import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from './event-bus.ts';
import { isEmpty } from './helpers.ts';
import authController from '@/controllers/auth';

type PropsType = Record<string, any>;

export default abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  _element!: HTMLElement;

  // Simple "element" getter to avoid private "element" access
  get element() {
    return this._element;
  }

  _meta: PropsType = {};

  _id!: string;

  _eventBus: EventBus;

  props: PropsType;

  children: Record<string, any> = {};

  _events: Record<string, any> = {};

  _logging = false;

  constructor(tagName = 'div', propsAndChildren: PropsType) {
    // devLog('Block', 'constructor');

    // Create a new event bus
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChildren);
    // Save children
    this.children = children;

    // Save provided tagName and props
    this._meta = {
      tagName,
      props,
    };

    if (props?.settings?.withInternalID) {
      // Generate unique ID
      this._id = makeUUID();
    }

    // --------- Login ?

    // Create proxy
    this.props = this._makePropsProxy({ ...props, __id: makeUUID() }); //__id: this._id

    //----------
    // Set link to the new event bus
    this._eventBus = eventBus;

    // Register block events
    this._registerEvents(eventBus);

    // Emit "init" event
    eventBus.emit(Block.EVENTS.INIT);
  }

  public async checkLogin() {
    try {
      const auth = await authController.authCheck();
      /// console.log('Block auth', auth);
      if (!isEmpty(auth)) {
        // console.log('!!!! Block checkLogin !isEmpty', auth);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(auth).forEach((entry) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [key, value] = entry;
          console.log('key=', key);
          this.props = this._makePropsProxy({ ...this.props, key: value });
        });

        this._logging = true;
      }
      return true;
    } catch (e: any) {
      return false;
    }
  }

  // Register required events
  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // Create resources, currently a single element, see createDocumentElement()
  _createResources() {
    const { tagName } = this._meta;
    // Save created element i.e. tagName to use inside getContent() later
    this._element = this._createDocumentElement(tagName);
  }

  // EVENT: "init" function
  _init() {
    if (this._logging) {
      console.log('EVENT: INIT', this);
    }
    this.init();

    // Create resources, currently a single element, see createDocumentElement()
    this._createResources();
    // Emit "render" event
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER, 'emit render');
  }

  init() {}

  start() {}

  // EVENT: "componentDidMount" function
  _componentDidMount() {
    if (this._logging) {
      // console.log('EVENT: CDM', this);
    }

    this.componentDidMount();

    Object.values(this.children).forEach((component) => {
      if (Array.isArray(component)) {
        component.forEach((child) => child.dispatchComponentDidMount());
      } else {
        component.dispatchComponentDidMount();
      }
    });
  }

  // Could be redeclared by user
  componentDidMount() {}

  // Dispatch i.e. emit "componentDidMount" event
  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM, 'emit cdm');
  }

  // EVENT: "componentDidUpdate" function
  _componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
    // console.log('_componentDidUpdate', oldProps, newProps);
    if (this._logging) {
      // console.log('EVENT: CDU', this);
    }
    this._componentDidMount();
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER, 'emit render');
    }
  }

  // Could be redeclared by user
  componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
    return JSON.stringify(oldProps) === JSON.stringify(newProps);
  }

  // Set block props
  setProps = (nextProps: PropsType) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  // EVENT: "render" function
  // Heads up - renders not the entire element i.e. not the tagName
  // Could be overriden externally with render()
  _render() {
    if (this._logging) {
      // console.log('EVENT: RENDER', this);
    }

    if (!this._element) {
      return;
    }

    const block: any = this.render();

    // Remove events
    this._removeEvents();

    // Clear element contents
    this._element.innerHTML = '';

    // Add element contents
    this._element.append(block);

    // Add element attributes
    this._addClasses();

    // Add events here
    this._addEvents();
  }

  // Could be redeclared by user
  //abstract render(): DocumentFragment;
  render() {}

  _removeEvents() {
    if (!(this._events && Object.keys(this._events).length)) {
      return;
    }
    Object.entries(this._events).forEach(([eventName, event]) => {
      this._element.removeEventListener(eventName, event, this._meta.tagName === 'form');
    });
  }

  _addEvents() {
    const { events = {} } = this.props;
    // Check if component has a child element which is the actual one e.g. input inside div wrapper
    const { child } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._events[eventName] = events[eventName];
      if (this._element.tagName) {
        let targetEl = this._element;
        if (child) {
          targetEl = this._element.querySelector(child) as HTMLElement;
        }
        // Add useCapture() for form elements
        targetEl.addEventListener(eventName, events[eventName], this._meta.tagName === 'form');
      }
    });
  }

  // Add CSS classes
  _addClasses() {
    const { css = [] } = this.props;

    if (!css) {
      return;
    }

    Object.entries(css).forEach(([_, cssClass]) => {
      this.element.classList.add(cssClass as string);
    });
  }

  // Helper to get element content for output
  getContent() {
    return this.element;
  }

  // Create proxy
  _makePropsProxy(props: PropsType) {
    // @todo Need to replace with a proper ES6 way
    const self = this;

    // @todo avoid re-assignment
    const proxyProps = new Proxy(props, {
      get(target: PropsType, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      // Prevent props removal
      deleteProperty() {
        throw new Error('Access error');
      },

      set(target: PropsType, prop: string, value: string | number) {
        target[prop] = value;

        // Update component
        // Bad cloneDeep, better to improve
        self._eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
    });

    return proxyProps;
  }

  // Create a single element based on provided tagName
  _createDocumentElement(tagName: string): HTMLElement {
    // Possible to create a method which creates a few blocks in a loop using fragments
    const element = document.createElement(tagName);
    if (this._id) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  // Filter props and children
  _getChildren(propsAndChildren: PropsType) {
    const children: PropsType = {};
    const props: PropsType = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  // Return compiled template
  compile(template: string, context: PropsType) {
    const propsAndStubs = { ...context };

    Object.entries(this.children).forEach(([key, component]: [string, Block | any]) => {
      if (Array.isArray(component)) {
        propsAndStubs[key] = component.map((child) => `<div data-id="${child.id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${component._id}"></div>`;
      }
    });
    const html = Handlebars.compile(template)(propsAndStubs);
    const fragment = document.createElement('template');
    fragment.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith(component.getContent());
    };

    Object.values(this.children).forEach((component: Block) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return fragment.content;
  }

  // Show block with simple CSS
  show() {
    if (!this._element) {
      return;
    }

    this._element.style.display = 'flex';
    console.log('show internal');
  }

  // Hide block with simple CSS
  hide() {
    if (!this._element) {
      return;
    }
    this._element.style.display = 'none';
    console.log('hide internal');
  }
}
