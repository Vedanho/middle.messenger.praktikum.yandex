import AuthAPI from '../api/auth';
import { ApiError, SignUpData, SignUpResponse } from '../api/auth/types';
import { PRIVATE_ROUTES } from '../constants';
import { ROUTES } from '../route/routes';
import { User } from '../types';

const authApi = new AuthAPI();

export const signUp = async (data: SignUpData) => {
  window.store.set({ isLoading: true });
  window.store.set({ signUpError: '' });
  try {
    const xhr = await authApi.signUp(data);
    const response: ApiError | SignUpResponse = JSON.parse(xhr.response);

    if ((response as ApiError)?.reason) {
      throw new Error((response as ApiError).reason);
    }

    if ((response as SignUpResponse)?.id) {
      window.router.go(ROUTES.chat);
    }
  } catch (error) {
    window.store.set({ signUpError: error });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const signIn = async (data) => {
  window.store.set({ isLoading: true });
  try {
    const xhr = await authApi.signIn(data);

    if (xhr.response === 'OK') {
      window.router.go(ROUTES.chat);
    } else {
      const response = JSON.parse(xhr.response);

      if (response.reason) {
        throw new Error(response.reason);
      }
    }
  } catch (error) {
    window.store.set({ loginError: error });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const getUser = async () => {
  const { pathname } = window.location;
  try {
    const xhr = await authApi.getUser();

    if (xhr.status === 401 && PRIVATE_ROUTES.includes(pathname)) {
      window.router.go(ROUTES.login);
    }

    if (xhr.status === 200) {
      const user: User = await JSON.parse(xhr.response);
      window.store.set({ user });

      if (pathname === ROUTES.login || pathname === ROUTES.registration) {
        window.router.go(ROUTES.chat);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const xhr = await authApi.logout();
  } catch (error) {
    console.log(error);
  }
};
