import UserAPI from '@/api/user-api';

class ProfileController {
  userApi = new UserAPI();

  public async avatarSave(data: Record<string, any>) {
    try {
      await this.userApi.avataredit(data);
      return true;
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }

  public async profileSave(data: Record<string, any>) {
    try {
      const res = await this.userApi.profileedit(data);
      return res;
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }

  public async password(data: Record<string, any>) {
    try {
      const res = await this.userApi.password(data);
      return res;
    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }
}

export default new ProfileController();
