import BaseAPI from './base-api';
import { IProps } from '@/types';
import HTTPTransport from '@/services/http';

const userAPIInstance = new HTTPTransport();

export default class UserAPI extends BaseAPI {
  static apiPath = `${BaseAPI.apiUrl}/user`;

  // change user profile
  profileedit(data: IProps): Promise<unknown> {
    return userAPIInstance.put(`${UserAPI.apiPath}/profile/`, { data });
  }

  // change avatar
  avataredit(data: IProps): Promise<unknown> {
    console.log('user-api ', `${UserAPI.apiPath}/profile/avatar/`, data);
    return userAPIInstance.put(`${UserAPI.apiPath}/profile/avatar/`, { data, type: 'form' });
  }

  // change avatar
  password(data: IProps): Promise<unknown> {
    return userAPIInstance.put(`${UserAPI.apiPath}/password/`, { data });
  }

  getid(id: number): Promise<unknown> {
    return userAPIInstance.get(`${UserAPI.apiPath}/${id}/`);
  }

  //
  search(data: IProps): Promise<unknown> {
    return userAPIInstance.post(`${UserAPI.apiPath}/search/`, { data });
  }
}
