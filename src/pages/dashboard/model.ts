import { IModel } from 'types';
import { pathMatchRegexp } from 'utils';
import { withExtendModel } from 'utils/models';

export interface IDashboardModelState {
  totalUser: number;
}

export interface IDrinkModelType extends IModel<IDashboardModelState> {
  namespace: 'dashboard';
  effects: {};
}

const DashboardModel: IDrinkModelType = {
  namespace: 'dashboard',
  state: {
    totalUser: 0,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/dashboard', pathname) || pathMatchRegexp('/', pathname)) {
          // @ts-ignore
          const payload = location.query;
          dispatch({ type: 'countUser' });
        }
      });
    },
  },
  effects: {},
};

export default withExtendModel(DashboardModel);
