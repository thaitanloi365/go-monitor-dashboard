import React from 'react';
import { Col, Row } from 'antd';
import { Page } from 'components';
import { connect } from 'dva';
import { IConnectState } from 'types';

import styles from './index.less';

@connect<IConnectState>(({ app, dashboard, loading }: IConnectState) => ({ app, dashboard, loading }))
export default class Dashboard extends React.PureComponent<IConnectState> {
  render() {
    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
        <Row gutter={24}>
          <Col key={0} lg={12} md={24}></Col>
        </Row>
      </Page>
    );
  }
}
