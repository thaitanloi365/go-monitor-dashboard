import { IModel, IReducer, IPaginationParam } from 'types';

import { pathMatchRegexp } from 'utils';
import { withExtendModel } from 'utils/models';

export interface IPostModelState {
  modalVisible: boolean;
  modalType: 'create' | 'update';
  selectedRowKeys: string[];
  pagination?: IPaginationParam;
}

export interface IPostModelType extends IModel<IPostModelState> {
  namespace: 'posts';
  effects: {};
}

const TabModel: IPostModelType = {
  namespace: 'posts',
  state: {
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],

    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/post', location.pathname)) {
          // @ts-ignore
          const payload = location.query;
          dispatch({
            type: 'getPostList',
            payload,
          });
        }
      });
    },
  },

  effects: {},
};

export default withExtendModel(TabModel);
