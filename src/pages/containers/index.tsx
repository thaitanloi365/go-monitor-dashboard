import React from 'react';
import { Col, Row } from 'antd';
import { Page } from 'components';
import { connect } from 'dva';
import { IConnectState } from 'types';

import styles from './index.less';
import ContainerCard from './components/ContainerCard';

@connect<IConnectState>(({ app, containers, loading }: IConnectState) => ({ app, containers, loading }))
export default class Containers extends React.PureComponent<IConnectState> {
  render() {
    const { containers, loading } = this.props;
    const { listContainer } = containers;
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
