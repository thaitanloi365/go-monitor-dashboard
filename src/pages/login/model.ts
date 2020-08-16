import store from 'store';
import router from 'umi/router';
import { IEffect, IModel } from 'types';
import { parseFromUrl } from 'utils';
import { login } from 'services/api/auth';

export interface ILoginModelState {}
export interface ILoginModelType extends IModel<ILoginModelState> {
  effects: {
    login: IEffect;
  };
}

const Model: ILoginModelType = {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call, select }) {
      const { success, data } = yield call(login, payload);
      if (success && data) {
        store.set('token', data.token);
        store.set('user', data.user);
        var value = parseFromUrl(location?.search);
        if (value?.from) {
          router.push(value?.from);
          return;
        }

        router.push('/dashboard');
      } else {
        throw data;
      }
    },
  },
};

export default Model;
