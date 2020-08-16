import React from 'react';
import { Col, Row } from 'antd';
import { Page } from 'components';
import { connect } from 'dva';
import { IConnectState } from 'types';

import styles from './index.less';
import ContainerCard from './components/ContainerCard';

@connect<IConnectState>(({ app, dashboard, loading }: IConnectState) => ({ app, dashboard, loading }))
export default class Dashboard extends React.PureComponent<IConnectState> {
  render() {
    const { dashboard, loading } = this.props;
    const { listContainer } = dashboard;
    return (
      <Page loading={loading.effects['getListContainer']} className={styles.dashboard}>
        <Row gutter={24}>
          {listContainer?.map((item, index) => (
            <ContainerCard item={item} key={index} />
          ))}
        </Row>
      </Page>
    );
  }
}
