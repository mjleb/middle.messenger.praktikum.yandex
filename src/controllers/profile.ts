import UserAPI from '@/api/user-api';

class ProfileController {
  userApi = new UserAPI();

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
