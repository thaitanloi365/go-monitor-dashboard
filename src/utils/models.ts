import modelExtend from 'dva-model-extend';
import { IModel } from 'types';

export const updateModel: IModel<any> = {
  reducers: {
    updateState(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export function withExtendModel<T>(model: IModel<T>) {
  return modelExtend(updateModel, model) as T;
}
