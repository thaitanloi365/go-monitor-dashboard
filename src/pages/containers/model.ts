import { getListDockerContainer } from 'services/api/docker';
import { IEffect, IModel } from 'types';
import { pathMatchRegexp, constants } from 'utils';
import { withExtendModel } from 'utils/models';

export interface IContainersModelState {
  listContainer: IContainer[];
}

export interface IContainerModelType extends IModel<IContainersModelState> {
  namespace: 'containers';
  effects: {
    getListContainer: IEffect;
  };
}

const ContainersModel: IContainerModelType = {
  namespace: 'containers',
  state: {
    listContainer: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp(constants.routeName.containers, pathname) || pathMatchRegexp('/', pathname)) {
          // @ts-ignore
          const payload = location.query;
          dispatch({ type: 'getListContainer' });
        }
      });
    },
  },
  effects: {
    *getListContainer({ payload }, { put, call, select }) {
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

export default withExtendModel(ContainersModel);
