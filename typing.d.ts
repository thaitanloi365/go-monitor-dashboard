declare module 'react-router-dom' {
  export function withRouter<T extends RouteComponentProps<any>>(component?: React.ComponentType<T>): any;
}

export interface IDisPatchProps {
  [key: string]: () => void;
}

export type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <
  TComponent extends React.ComponentType<TInjectedProps & TNeedsProps>
>(
  component: TComponent,
) => TComponent;

export interface IConnectProps {
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, IConnectProps>,
    mapDispatchToProps?: IDisPatchProps,
  ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;

  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, IConnectProps>,
    mapDispatchToProps?: IDisPatchProps,
    mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
    options?: Options<TStateProps, TOwnProps, TMergedProps>,
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;
}

declare module 'react-redux' {
  // tslint:disable-next-line
  interface Connect extends IConnectProps {}
}

declare module '*.css';
declare module '*.png';
declare module '*.less';
declare module 'enquire-js';
declare module 'dva-model-extend';
