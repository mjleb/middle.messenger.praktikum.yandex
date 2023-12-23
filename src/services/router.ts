import { devLog } from '../shared/lib';
import store from './store';
import Route from './route';
import links from '../pages/links.json' assert { type: 'json' };
import authController from '../controllers/auth';

export class Router {
  static __instance: any;

  _baseUrl = new URL(window.location.href).origin;

  routes: any[] = [];

  history!: History;

  _currentRoute: any;

  _rootQuery;

  _privatePage: any[] = [];

  constructor(rootQuery: string) {
    // devLog('Router constructor');
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this._privatePage = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  async init() {
    devLog('Router init');
  }
  // access null || private

  use(pathname: string, block: any, access?: string) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    if (access == 'private') {
      this._privatePage.push(pathname);
    }
    return this;
  }

  start() {
    //devLog('Router', 'start');

    window.onpopstate = ((event: any) => {
      this._onRoute(event.currentTarget.location.pathname);
      // eslint-disable-next-line no-extra-bind
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    // console.log('Router _onRoute pathname:', pathname);
    const route = this.getRoute(pathname);
    // console.log('Router _onRoute route:', JSON.stringify(route));
    // devLog('Router _onRoute _access:', this._access(pathname));
    if (!route) {
      this.go(links.error400);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    authController.authCheck();
    route.render(route, pathname);
  }

  go(pathname: string) {
    //devLog('Router go pathname', pathname);
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname)) ?? null;
  }

  getPath() {
    return this._baseUrl;
  }

  // true|false access for content
  _access(pathname: string) {
    const result = true;
    if (this._privatePage.includes(pathname)) {
      devLog('Router _access  private:');
      if (!store.getState()?.user) {
        console.log('Router _access  private store??? :', store.getState()?.user);
        return false;
      }
    }
    return result;
  }
}
const router = new Router('#app');
console.log('router', router);
export default router;
