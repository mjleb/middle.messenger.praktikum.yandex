/* eslint-disable no-restricted-imports */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';

import Block from './block';
import Route from './route';
import { Router } from './router';

const basePath = 'http://example.org';

describe('Test class Router', () => {
  let ComponentNew: typeof Block;
  let router: Router;
  let stub: sinon.SinonStub<any[], any>;

  before(() => {
    class ComponentC extends Block {
      // eslint-disable-next-line no-useless-constructor
      constructor() {
        super('div', {});
      }

      render() {
        return function () {
          return '<div>1</div>';
        };
      }
    }

    ComponentNew = new ComponentC() as unknown as typeof Block;
    router = new Router('#app');
    stub = sinon.stub();
    router._onRoute = stub;
  });

  it('Class Router is Singleton', () => {
    const newRouter = new Router('#app');
    const newRouter2 = new Router('#app');
    expect(newRouter).to.equal(newRouter2);
  });

  it('The "getRoute" method. If a path exists, return a Route object', () => {
    router.use('somePath', ComponentNew);
    const route = router.getRoute('somePath');
    expect(route).to.be.an.instanceof(Route);
  });

  it('The "getRoute" method. If a path not exist, return null', () => {
    router.use('somePath', ComponentNew);
    const route = router.getRoute('anotherPath');
    expect(route).to.be.null;
  });

  it('The "use" method. Sets the component match for the specified route. Returns a router object.', () => {
    const spy = sinon.spy(router, 'use');
    router.use('somePath', ComponentNew);
    expect(spy.called).to.be.true;
    expect(spy.returned(router));
  });

  it('The "start" method. Processes window.onpopstate events. Starts rendering the content.', () => {
    router.start();
    expect(stub.called).to.be.true;
  });

  it('The "go" method. Changes the active route. Starts content regeneration.', () => {
    router.go('newPath');
    expect(window.location.href).to.be.equal(`${router._baseUrl}/newPath`);
  });

  it('The "back" method. Calls the history.back method', () => {
    const spy = sinon.spy(window.history, 'back');
    router.back();
    expect(spy.calledOnce).to.be.true;
  });

  it('The "forward" method. Calls the history.forward method', () => {
    const forwardSpy = sinon.spy(window.history, 'forward');
    router.forward();
    expect(forwardSpy.calledOnce).to.be.true;
  });
});
