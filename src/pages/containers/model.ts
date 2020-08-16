import {getListDockerContainer} from 'services/api/docker';
import {IEffect, IModel} from 'types';
import {pathMatchRegexp} from 'utils';
import {withExtendModel} from 'utils/models';

export interface IDashboardModelState {
  listContainer: Container[];
}

export interface IDrinkModelType extends IModel<IDashboardModelState> {
  namespace: 'container';
  effects: {
    getListContainer: IEffect,
  };
}

const DashboardModel: IDrinkModelType = {
  namespace: 'container',
  state: {
    listContainer: [],
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathMatchRegexp('/dashboard', pathname) ||
            pathMatchRegexp('/', pathname)) {
          // @ts-ignore
          const payload = location.query;
          dispatch({type: 'getListContainer'});
        }
      });
    },
  },
  effects: {
    *
    getListContainer({payload}, {put, call, select}) {
      const {success, data} = yield call(getListDockerContainer, payload);
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
    }
  },
};

export default withExtendModel(DashboardModel);
