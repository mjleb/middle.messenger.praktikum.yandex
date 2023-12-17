import AuthAPI from '@/api/auth-api';
import { cleanAlert, isEmpty, messageError, messageWarning } from '@/services/helpers';
import links from '@/pages/links.json';
import store from '@/services/store';
import router from '@/services/router';
import { devLog } from '@/shared/lib';

class AuthController {
  authApi = new AuthAPI();

  public async authCheck() {
    // devLog('AuthController authCheck', 'start');
    const userStore = store.getState();
    const path = window.location.pathname;
    // console.log('AuthController authCheck path', path, `${links.login}`);
    // devLog('AuthController authCheck userStore', JSON.stringify(userStore));
    // ====================
    try {
      const res = (await this.authApi.request()) as XMLHttpRequest;
      // devLog('getUserId res.response', res.response);
      // console.log('AuthController getUserId router', router);
      if (res.status == 401 && path != `${links.login}` && path != `${links.signup}`) {
        router.go(links.login);
      }

      if (res.status !== 200) {
        // messageWarning(res.response);
        return false;
      }
      const user = JSON.parse(res.response);
      // devLog('getUserId user', user);
      // console.log('authCheck  userStore', userStore);
      // console.log('authCheck isEmpty(userStore)', isEmpty(userStore));

      if (user) {
        if (isEmpty(userStore)) {
          store.set('user', user);
          if (path != links.chat && path == `${links.login}`) {
            router.go(links.chat);
          }
        }
      }
      return true;
    } catch (e: any) {
      messageError(e);
      return false;
    }
  }

  public async getUserId() {
    const path = window.location.pathname;
    try {
      const res = (await this.authApi.request()) as XMLHttpRequest;
      // devLog('getUserId res.response', res.response);
      // console.log('AuthController getUserId router', router);
      if (res.status == 401 && path != `${links.login}` && path != `${links.signup}`) {
        router.go(links.login);
      }

      if (res.status !== 200) {
        // messageWarning(res.response);
        return false;
      }
      const user = JSON.parse(res.response);
      if (!user) {
        return false;
      }
      store.set('user', user);
      return user;
    } catch (e: any) {
      messageError(e);
      return false;
    }
  }

  public async signup(data: Record<string, any>) {
    try {
      // cleanAlert();
      // ------
      const dataRecord = {
        first_name: data.first_name,
        second_name: data.second_name,
        login: data.login,
        email: data.email,
        password: data.password,
        phone: data.phone,
      };
      // -------
      const res = (await this.authApi.signup(dataRecord)) as XMLHttpRequest;
      if (res.status !== 200) {
        messageWarning(res.response);
        return;
      }
      await this.getUserId();
      router.go(links.chat);
      // -------
    } catch (e: any) {
      messageError(e);
    }
  }

  public async login(data: Record<string, any>) {
    try {
      const auth = (await this.authCheck()) as boolean;
      console.log('login auth', auth);
      if (auth) {
        router.go(links.profile);
      }
      const res = (await this.authApi.signin(data)) as XMLHttpRequest;

      if (res.status !== 200) {
        messageWarning(res.response);
      }
      const id = await this.getUserId();
      devLog('login id', id);
      cleanAlert();
      router.go(links.profile);
    } catch (e: any) {
      messageError(e);
    }
  }

  public async logout() {
    try {
      cleanAlert();
      const res = (await this.authApi.logout()) as XMLHttpRequest;
      if (res.status !== 200) {
        messageWarning(res.response);
      }
      router.go(links.login);
    } catch (e: any) {
      messageError(e);
    }
  }
}

export default new AuthController();
