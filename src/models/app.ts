import store from 'store';
import config from 'utils/config';
import { stringify } from 'qs';
import { IConnectState, IMenuItem, ITheme, IModel, IReducer, ISubscription, IEffect } from 'types';
import { INotificationItem } from 'types/app';
import { parseFromUrl } from 'utils';
import { queryLayout } from 'utils';
import { CANCEL_REQUEST_MESSAGE } from 'utils/constants';
import router from 'umi/router';
import APIFunction from 'services/api';

export interface IAppModelState {
  routeList: IMenuItem[];
  locationPathname: string;
  locationQuery: any;
  theme: ITheme;
  collapsed: boolean;
  notifications: INotificationItem[];
}

export interface IAppModelType extends IModel<IAppModelState> {
  namespace: 'app';
  reducers: {
    updateState: IReducer<IAppModelState>;
    handleThemeChange: IReducer<IAppModelState>;
    handleCollapseChange: IReducer<IAppModelState>;
    allNotificationsRead: IReducer<IAppModelState>;
  };

  subscriptions: {
    setup: ISubscription;
    setupHistory: ISubscription;
    setupRequestCancel: ISubscription;
  };
  effects: {
    sessionTimeout: IEffect;
    query: IEffect;
    logout: IEffect;
  };
}

const AppModel: IAppModelType = {
  namespace: 'app',
  state: {
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Dashboard',
        route: '/dashboard',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' });
    },
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            // @ts-ignore
            locationQuery: location.query,
          },
        });
      });
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        // @ts-ignore
        const { cancelRequest = new Map() } = window;

        // @ts-ignore
        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE);
            cancelRequest.delete(key);
          }
        });
      });
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const token = store.get('token', '');
      const { locationPathname } = yield select((state: IConnectState) => state.app);
      const layout = queryLayout(config.layouts, window.location.pathname);
      console.log('token here: ', token);
      if (token != '') {
        yield put({
          type: 'getConstants',
        });
      }

      if (layout !== 'public') {
        if (token === '') {
          router.push({
            pathname: '/login',
            search: stringify({
              from: locationPathname === '' ? location.pathname : locationPathname,
            }),
          });
          return;
        }
        var value = parseFromUrl(location?.search);
        if (value?.from) {
          router.push(value?.from);
          return;
        }

        return;
      }
      router.push({
        pathname: '/login',
        search: stringify({
          from: locationPathname === '' ? location.pathname : locationPathname,
        }),
      });
      return;
    },

    *logout({ payload }, { call, select }) {
      const data = yield call(APIFunction.logout);
      const { locationPathname } = yield select((state: IConnectState) => state.app);
      if (data.success) {
        store.clearAll();
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname === '' ? location.pathname : locationPathname,
          }),
        });
      } else {
        throw data;
      }
    },

    *sessionTimeout({ payload }, { call, select }) {
      const { locationPathname } = yield select((state: IConnectState) => state.app);
      store.clearAll();
      router.push({
        pathname: '/login',
        search: stringify({
          from: locationPathname === '' ? location.pathname : locationPathname,
        }),
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload);
      state.theme = payload;
      return state;
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload);
      state.collapsed = payload;
      return state;
    },

    allNotificationsRead(state) {
      state.notifications = [];
      return state;
    },
  },
};

export default AppModel;
