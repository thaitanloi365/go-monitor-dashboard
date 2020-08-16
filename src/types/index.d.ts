import {MenuDataItem} from '@ant-design/pro-layout';
import {FormComponentProps} from 'antd/lib/form/Form';
import {Effect} from 'dva';
import {Effect, Subscription} from 'dva';
import {IAppModelState} from 'models/app';
import {IBusinessDetailsModelState} from 'pages/businesses/$id/menu/model';
import {IContainerDetailModelState} from 'pages/containers/containers/model';
import {IDashboardModelState} from 'pages/containers/model';
import {IFoodDetailsModelState} from 'pages/food/$id/model';
import {IFoodModelState} from 'pages/food/model';
import {ILoginModelType} from 'pages/login/model';
import {IPostDetailModelState} from 'pages/posts/$id/model';
import {IPostModelState} from 'pages/posts/model';
import {IUserDetailsModelState} from 'pages/users/$id/model';
import {IUserModelState} from 'pages/users/model';
import {Reducer} from 'react';
import {RouteComponentProps} from 'react-router-dom';

export type ITheme = 'dark'|'light';
export type IEffect = Effect;
export type IReducer<T> = Reducer<T, any>;
export type ISubscription = Subscription;
export type IGlobalModelState = GlobalModelState;

export interface IFormProps extends FormComponentProps {}

export interface IModel<T> {
  namespace?: string;
  state?: T;
  effects?: {[key: string]: Effect};
  reducers?: {[key: string]: Reducer<T>};
  subscriptions?: {[key: string]: Subscription};
}

export interface ILoadingState {
  global: boolean;
  effects: {[key: string]: boolean|undefined};
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface IConnectState extends Partial<IConnectProps> {
  app?: IAppModelState;
  dashboard?: IDashboardModelState;
  containerDetail?: IContainerDetailModelState;
  loading?: ILoadingState;
  login?: ILoginModelType;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

export interface IUpdateModelBase<T extends any> extends IModel<T> {
  reducers: {updateState: Reducer<T>};
}

export interface IPagingModelBase<T extends any> extends IModel<T> {
  state: {
    list: T[];
    pagination?: {
      showSizeChanger: boolean; showQuickJumper: boolean; current: number;
      total: number;
      pageSize: number;
    };
  };
  reducers: {updateState?: Reducer<IUserModelState>};
}

export interface IConnectProps<T = {}> extends
    Partial<RouteComponentProps<Route, T>> {
  dispatch?<K = any>(action: AnyAction): K;
}

export interface IPagingQueryParam {
  page: number;
  per_page: number;
}
export interface IPaginationParam {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
}

export interface IPaging<T> {
  has_next: boolean;
  has_prev: boolean;
  per_page: number;
  next_page: number;
  current_page: number;
  prev_page: number;
  offset: number;
  records: T[];
  total_record: number;
  total_page: number;
}

export interface IMenuItem {
  id: string;
  icon?: string;
  faIcon?: string;
  name?: string;
  route: string;
  breadcrumbParentId?: string;
  menuParentId?: string;
}

export type IMenus = IMenuItem[];
