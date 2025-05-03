import { HTTPTransport } from '../fetch';
import { SignInData, SignUpData } from './types';

const authApi = new HTTPTransport('auth');

export default class AuthAPI {
  async signUp(data: SignUpData) {
    return authApi.post<SignUpData>('/signup', { data });
  }

  async signIn(data: SignInData) {
    return authApi.post<SignInData>('/signin', { data });
  }

  async logout() {
    return authApi.post('/logout');
  }

  async getUser() {
    return authApi.get('/user');
  }
}
