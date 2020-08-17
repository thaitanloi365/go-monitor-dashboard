import { getListDockerContainer } from 'services/api/docker';
import { IEffect, IModel } from 'types';
import { pathMatchRegexp } from 'utils';
import { withExtendModel } from 'utils/models';

export interface IHealthCheckModelState {
  listContainer: Container[];
}

export interface IHealthCheckModelType extends IModel<IHealthCheckModelState> {
  namespace: 'healthCheck';
  effects: { listContainer: IEffect };
}

const HealthCheckModel: IHealthCheckModelType = {
  namespace: 'healthCheck',
  state: {
    listContainer: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/healthcheck', pathname)) {
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

export default withExtendModel(HealthCheckModel);
