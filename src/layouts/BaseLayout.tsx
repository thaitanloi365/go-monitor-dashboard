import React from 'react';
import NProgress from 'nprogress';
import config from 'utils/config';
import withRouter from 'umi/withRouter';
import PrimaryLayout from './PrimaryLayout';
import PublicLayout from './PublicLayout';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import { queryLayout } from 'utils';
import { IConnectState } from 'types';

import './BaseLayout.less';

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout,
};

@withRouter
@connect<IConnectState>(({ loading }: IConnectState) => ({ loading }))
export default class BaseLayout extends React.PureComponent<IConnectState, any> {
  previousPath = '';
  render() {
    const { loading, children, location } = this.props;
    const Container = LayoutMap[queryLayout(config.layouts, location.pathname)];
    const currentPath = location.pathname + location.search;
    if (currentPath !== this.previousPath) {
      NProgress.start();
    }

    if (!loading.global) {
      NProgress.done();
      this.previousPath = currentPath;
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Container>{children}</Container>
      </React.Fragment>
    );
  }
}
