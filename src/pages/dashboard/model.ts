import { getListDockerContainer } from 'services/api/docker';
import { IEffect, IModel } from 'types';
import { pathMatchRegexp } from 'utils';
import { withExtendModel } from 'utils/models';

export interface IDashboardModelState {
  listContainer: Container[];
}

export interface IDrinkModelType extends IModel<IDashboardModelState> {
  namespace: 'dashboard';
  effects: { listContainer: IEffect };
}

const DashboardModel: IDrinkModelType = {
  namespace: 'dashboard',
  state: {
    listContainer: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/dashboard', pathname) || pathMatchRegexp('/', pathname)) {
          // @ts-ignore
          const payload = location.query;
          dispatch({ type: 'listContainer' });
        }
      });
    },
  },
  effects: {
    *listContainer({ payload }, { put, call, select }) {
      const { success, data } = yield call(getListDockerContainer, payload);
      if (success && data) {
        yield put({
          type: 'updateState',
          payload: {
            listContainer: data,
          },
        });
      } else {
        throw data;
      }
    },
  },
};

export default withExtendModel(DashboardModel);
