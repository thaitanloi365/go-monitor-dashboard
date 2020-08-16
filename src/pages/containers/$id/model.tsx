import { IEffect, IModel, IReducer } from 'types';
import { pathMatchRegexp } from 'utils';
import { withExtendModel } from 'utils/models';
import { getDockerContainerDetail, getStreamDockerLogsURL } from 'services/api/docker';

export interface IContainerDetailModelState {
  data: Container;
  logs: Array<any>;
  searchKeyword: string;
  originLogs: Array<any>;
}

export interface IDrinkModelType extends IModel<IContainerDetailModelState> {
  namespace: 'containerDetail';
  effects: {
    getContainerDetail: IEffect;
  };
  reducers: {
    updateLog: IReducer<IContainerDetailModelState>;
    handleSearch: IReducer<IContainerDetailModelState>;
  };
}

const ContainerModel: IDrinkModelType = {
  namespace: 'containerDetail',
  state: {
    data: null,
    logs: [],
    originLogs: [],
    searchKeyword: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        var match = pathMatchRegexp('/containers/:id', pathname);
        if (match) {
          // @ts-ignore
          const payload = location.query;
          const id = match[1];
          dispatch({ type: 'getContainerDetail', payload: { id } });

          const eventSource = new EventSource(getStreamDockerLogsURL(id));
          eventSource.onmessage = e =>
            setTimeout(() => {
              dispatch({ type: 'updateLog', payload: e?.data });
            }, 1000);
        }
      });
    },
  },
  effects: {
    *getContainerDetail({ payload }, { put, call, select }) {
      const { id } = payload;
      const { success, data } = yield call(getDockerContainerDetail, id);
      if (success && data) {
        yield put({
          type: 'updateState',
          payload: {
            data,
          },
        });
      } else {
        throw data;
      }
    },
  },
  reducers: {
    updateLog(state, { payload }) {
      const { searchKeyword: keyword } = state;
      state?.originLogs.push(payload);
      if (typeof keyword === 'string' && keyword !== '') {
        state.logs = state?.originLogs?.filter(item => item?.toLowerCase().includes(keyword.toLowerCase()));
      } else {
        state.logs = state.originLogs;
      }
      return state;
    },
    handleSearch(state, { payload }) {
      const { keyword } = payload;
      state.searchKeyword = keyword;

      if (typeof keyword === 'string' && keyword !== '') {
        state.logs = state?.originLogs?.filter(item => item?.toLowerCase().includes(keyword.toLowerCase()));
      } else {
        state.logs = state.originLogs;
      }
      return state;
    },
  },
};

export default withExtendModel(ContainerModel);
