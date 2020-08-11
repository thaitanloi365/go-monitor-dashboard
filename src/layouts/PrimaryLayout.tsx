import React from 'react';
import store from 'store';
import withRouter from 'umi/withRouter';
import Error from '../pages/404';

import { GlobalFooter } from 'ant-design-pro';
import { BackTop, Drawer, Layout } from 'antd';
import { MyLayout } from 'components';
import { IHeaderProps } from 'components/Layout/Header';
import { ISiderProps } from 'components/Layout/Sider';
import { connect } from 'dva';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { IConnectState } from 'types';
import { config, constants } from 'utils';

import styles from './PrimaryLayout.less';

const { Content } = Layout;
const { Header, Bread, Sider } = MyLayout;

@withRouter
@connect<IConnectState>(({ app, loading }: IConnectState) => ({ app, loading }))
export default class PrimaryLayout extends React.PureComponent<IConnectState> {
  state = {
    isMobile: false,
  };
  enquireHandler: any;

  componentDidMount() {
    this.enquireHandler = enquireScreen((mobile: boolean) => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  onCollapseChange = (collapsed: boolean) => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    });
  };

  renderFooterInfo() {
    return (
      <div className={styles.info}>
        <span>{config.copyright}</span>
      </div>
    );
  }
  render() {
    const { app, dispatch, children } = this.props;
    const { theme, collapsed, notifications } = app || {};
    const user = store.get('user') || {};
    const token = store.get('token') || '';
    const { isMobile } = this.state;
    const { onCollapseChange } = this;

    // Query whether you have permission to enter this page
    const hasPermission = token !== '';

    // MenuParentId is equal to -1 is not a available menu.
    const menus = constants.menus.filter(_ => _.menuParentId !== '-1');

    const headerProps: IHeaderProps = {
      menus,
      collapsed,
      notifications,
      onCollapseChange,
      fixed: config.fixedHeader,
      onAllNotificationsRead() {
        dispatch({ type: 'app/allNotificationsRead' });
      },
      onLogout() {
        dispatch({ type: 'app/logout' });
      },
      user,
    };

    const siderProps: ISiderProps = {
      theme,
      menus,
      isMobile,
      collapsed,
      onCollapseChange,
      onThemeChange(theme: 'light' | 'dark') {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        });
      },
    };

    return (
      <React.Fragment>
        <Layout>
          {isMobile ? (
            <Drawer
              maskClosable={true}
              closable={false}
              onClose={onCollapseChange.bind(this, !collapsed)}
              visible={!collapsed}
              placement="left"
              width={200}
              style={{
                padding: 0,
                height: '100vh',
              }}
            >
              <Sider {...siderProps} collapsed={false} />
            </Drawer>
          ) : (
            <Sider {...siderProps} />
          )}
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            <Content className={styles.content}>
              <Bread routeList={constants.menus} />
              {hasPermission ? children : <Error />}
            </Content>
            <BackTop
              className={styles.backTop}
              target={() => document.querySelector('#primaryLayout') as HTMLHtmlElement}
            />
            <GlobalFooter className={styles.footer} copyright={this.renderFooterInfo()} />
          </div>
        </Layout>
      </React.Fragment>
    );
  }
}
