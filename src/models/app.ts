import store from 'store';
import router from 'umi/router';
import { stringify } from 'qs';
import { logout } from 'services/api/user';
import { IConnectState, IEffect, IMenuItem, IModel, IReducer, ISubscription, ITheme } from 'types';
import { INotificationItem } from 'types/app';
import { parseFromUrl } from 'utils';
import { queryLayout } from 'utils';
import config from 'utils/config';
import constants, { CANCEL_REQUEST_MESSAGE } from 'utils/constants';

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
  effects: { sessionTimeout: IEffect; query: IEffect; logout: IEffect };
}

const AppModel: IAppModelType = {
  namespace: 'app',
  state: {
    routeList: [
      {
        id: '1',
        icon: 'dashboard',
        name: 'Containers',
        route: constants.routeName.containers,
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
        } else {
          var value = parseFromUrl(location?.search);
          if (value?.from && value?.from !== '/') {
            router.push(value?.from);
          } else {
            router.push(constants.routeName.containers);
          }
        }
      } else {
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname === '' ? location.pathname : locationPathname,
          }),
        });
      }
    },

    *logout({ payload }, { call, select }) {
      const data = yield call(logout);
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
