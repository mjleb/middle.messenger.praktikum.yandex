// eslint-disable-next-line object-curly-newline
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
      await this.userApi.avataredit(data);
      return true;
    } catch (e: any) {
      console.error(e.message);
      return false;
    }
  }

  public async profileSave(data: Record<string, any>) {
    try {
      await this.userApi.profileedit(data);
      return true;
    } catch (e: any) {
      console.error(e.message);
      return false;
    }
  }
}

export default new ProfileController();
