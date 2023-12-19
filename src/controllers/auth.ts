import AuthAPI from '@/api/auth-api';
import links from '@/pages/links.json';
import store from '@/services/store';
import router from '@/services/router';

class AuthController {
  authApi = new AuthAPI();

  public async authCheck() {
    const userStore = store.getState()?.user;
    const path = window.location.pathname;
    try {
      const user = await this.authApi.request();
      if (user) {
        // if (isEmpty(userStore)) {        }
        if (userStore != user) {
          store.set('user', user);
          if (path != links.chat && path == `${links.login}`) {
            router.go(links.chat);
          }
        }
      }
      return true;
    } catch (e: any) {
      console.error(e.message);
      return false;
    }
  }

  public async getUserId() {
    try {
      const user = await this.authApi.request();
      if (!user) {
        return false;
      }
      store.set('user', user);
      return user;
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }

  public async signup(data: Record<string, any>) {
    try {
      const dataRecord = {
        first_name: data.first_name,
        second_name: data.second_name,
        login: data.login,
        email: data.email,
        password: data.password,
        phone: data.phone,
      };

      const user = await this.authApi.signup(dataRecord);
      console.log('async signup', user);
      await this.getUserId();
      router.go(links.chat);
      return true;
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }

  public async login(data: Record<string, any>) {
    try {
      const res = await this.authApi.signin(data);
      if (res == 'OK') {
        await this.getUserId();
        router.go(links.chat);
      }
      return res;
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }

  public async logout() {
    try {
      const res = await this.authApi.logout();
      store.set('user', {});
      router.go(links.login);
      return res;
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }
}

export default new AuthController();
