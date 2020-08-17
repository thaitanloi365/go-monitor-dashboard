import store from 'store';
import router from 'umi/router';
import { login } from 'services/api/auth';
import { IEffect, IModel } from 'types';
import { parseFromUrl, constants } from 'utils';

export interface ILoginModelState {}
export interface ILoginModelType extends IModel<ILoginModelState> {
  effects: { login: IEffect };
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
        if (value?.from && value?.from !== '/login') {
          router.push(value?.from);
          return;
        }

        router.push(constants.routeName.containers);
      } else {
        throw data;
      }
    },
  },
};

export default Model;
