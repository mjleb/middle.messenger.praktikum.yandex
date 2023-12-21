import { IProps } from '@/types';
import BaseAPI from '@/api/base-api';
import HTTPTransport from '@/services/http';

const authAPIInstance = new HTTPTransport();

export default class AuthAPI extends BaseAPI {
  static apiPath = `${BaseAPI.apiUrl}/auth`;

  signup(data: IProps): Promise<unknown> {
    return authAPIInstance.post(`${AuthAPI.apiPath}/signup/`, { data });
  }

  signin(data: any) {
    return authAPIInstance.post(`${AuthAPI.apiPath}/signin/`, { data });
  }

  request() {
    return authAPIInstance.get(`${AuthAPI.apiPath}/user/`);
  }

  logout() {
    return authAPIInstance.post(`${AuthAPI.apiPath}/logout/`);
  }
}
