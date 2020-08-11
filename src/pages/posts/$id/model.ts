import { IModel } from 'types';
import { pathMatchRegexp } from 'utils';
import { withExtendModel } from 'utils/models';

export interface IPostDetailModelState {}

export interface IPostDetailModelType extends IModel<IPostDetailModelState> {
  effects: {};
  reducers: {};
}

const Model: IPostDetailModelType = {
  namespace: 'postDetail',

  state: {
    currentItem: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/post/:id', pathname);

        if (match) {
          dispatch({ type: 'getPostDetail', payload: match[1] });
        }
      });
    },
  },

  effects: {},

  reducers: {},
};

export default withExtendModel(Model);
