import { cleanAlert, messageError, messageSuccsess, messageWarning } from '@/services/helpers';

import UserAPI from '@/api/user-api';
import store from '@/services/store';
import authController from '@/controllers/auth';

class ProfileController {
  userApi = new UserAPI();

  public profile() {
    cleanAlert();
    return true;
  }

  public async avatarSave(data: Record<string, any>) {
    try {
      cleanAlert();

      const res = (await this.userApi.avataredit(data)) as XMLHttpRequest;

      if (res.status !== 200) {
        messageWarning(res.response);
        return true;
      }

      authController.getUserId();
      store.set('succsess', 'Файл успешно загружен');
      messageSuccsess(res.response);
      return true;
    } catch (e: any) {
      messageError(e);
      return false;
    }
  }

  public async profileSave(data: Record<string, any>) {
    try {
      cleanAlert();

      const res = (await this.userApi.profileedit(data)) as XMLHttpRequest;

      if (res.status !== 200) {
        messageWarning(res.response);
        return true;
      }

      authController.getUserId();
      store.set('succsess', 'Данные успешно сохраннены');
      messageSuccsess(res.response);
      return true;
    } catch (e: any) {
      messageError(e);
      return false;
    }
  }
}

export default new ProfileController();
