import React from 'react';
import { Col, Row } from 'antd';
import { Page } from 'components';
import { connect } from 'dva';
import { IConnectState } from 'types';

import styles from './index.less';
import ServiceCard from './components/ServiceCard';

@connect<IConnectState>(({ app, healthCheck, loading }: IConnectState) => ({ app, healthCheck, loading }))
export default class HealthCheck extends React.PureComponent<IConnectState> {
  render() {
    const { healthCheck } = this.props;

    return (
      <Page className={styles.dashboard}>
        {/* <Row gutter={24}>
          {listContainer?.map((item, index) => (
            <ServiceCard item={item} key={index} />
          ))}
        </Row> */}
      </Page>
    );
  }
}
