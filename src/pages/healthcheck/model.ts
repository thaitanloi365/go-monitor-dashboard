import { IEffect, IModel, IReducer } from 'types';
import { pathMatchRegexp } from 'utils';
import { withExtendModel } from 'utils/models';
import { getListJobHealthCheck, createJobHealthCheck, removeJobHealthCheck } from 'services/api/job_health_check';

export interface IHealthCheckModelState {
  listJobHealthCheck: IJobHealthCheck[];
  healthCheckModalVisible: boolean;
  healthCheckModalType: 'create' | 'update';
  currentJobHealthCheck: IJobHealthCheck;
}

export interface IHealthCheckModelType extends IModel<IHealthCheckModelState> {
  namespace: 'healthcheck';
  effects: {
    listJobHealthCheck: IEffect;
    createJobHealthCheck: IEffect;
    deleteJobHealthCheck: IEffect;
  };
  reducers: {
    showHealthCheckModal: IReducer<IHealthCheckModelState>;
    hideHealthCheckModal: IReducer<IHealthCheckModelState>;
  };
}

const HealthCheckModel: IHealthCheckModelType = {
  namespace: 'healthcheck',
  state: {
    listJobHealthCheck: [],
    healthCheckModalVisible: false,
    healthCheckModalType: 'create',
    currentJobHealthCheck: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/healthcheck', pathname)) {
          // @ts-ignore
          const payload = location.query;
          dispatch({ type: 'listJobHealthCheck' });
        }
      });
    },
  },
  effects: {
    *listJobHealthCheck({ payload }, { put, call, select }) {
      const { success, data } = yield call(getListJobHealthCheck, payload);
      if (success && data) {
        yield put({
          type: 'updateState',
          payload: {
            listJobHealthCheck: data,
          },
        });
      } else {
        throw data;
      }
    },
    *createJobHealthCheck({ payload }, { put, call, select }) {
      const { success, data } = yield call(createJobHealthCheck, payload);
      if (success && data) {
        yield put({
          type: 'updateState',
          payload: {
            healthCheckModalVisible: false,
          },
        });
      } else {
        throw data;
      }
    },
    *deleteJobHealthCheck({ payload }, { put, call, select }) {
      const { success, data } = yield call(getListJobHealthCheck, payload);
      if (success && data) {
        yield put({
          type: 'updateState',
          payload: {
            listJobHealthCheck: data,
          },
        });
      } else {
        throw data;
      }
    },
  },
  reducers: {
    showHealthCheckModal(state, { payload }) {
      state.healthCheckModalVisible = true;
      return state;
    },
    hideHealthCheckModal(state, { payload }) {
      state.healthCheckModalVisible = false;
      return state;
    },
  },
};

export default withExtendModel(HealthCheckModel);
