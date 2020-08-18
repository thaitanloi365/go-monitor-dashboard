import React from 'react';
import { Col, Row, Button } from 'antd';
import { Page } from 'components';
import { connect } from 'dva';
import { IConnectState } from 'types';

import styles from './index.less';
import HealthCheckCard from './components/HealthCheckCard';
import HealthCheckServiceModal from './components/HealthCheckServiceModal';

@connect<IConnectState>(({ app, healthcheck, loading }: IConnectState) => ({ app, healthcheck, loading }))
export default class HealthCheck extends React.PureComponent<IConnectState> {
  handleAddHealthCheckService = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'healthcheck/showHealthCheckModal',
      payload: {},
    });
  };

  renderModal() {
    const { dispatch, healthcheck, loading } = this.props;
    const { currentJobHealthCheck, healthCheckModalType, healthCheckModalVisible } = healthcheck;

    const funcType = `healthcheck/${healthCheckModalType}JobHealthCheck`;
    return (
      <HealthCheckServiceModal
        item={healthCheckModalType === 'create' ? null : currentJobHealthCheck}
        visible={healthCheckModalVisible}
        destroyOnClose={true}
        centered={true}
        maskClosable={false}
        confirmLoading={loading.effects[funcType]}
        title={`${healthCheckModalType === 'create' ? 'Create Job Health Check' : 'Update Job Health Check'}`}
        onAccept={data => {
          dispatch({
            type: funcType,
            payload: data,
          }).then(() => {
            dispatch({
              type: 'healthcheck/listJobHealthCheck',
            });
          });
        }}
        onCancel={() => {
          dispatch({
            type: 'healthcheck/hideHealthCheckModal',
          });
        }}
      />
    );
  }

  render() {
    const { healthcheck } = this.props;
    const { listJobHealthCheck } = healthcheck;
    return (
      <Page inner className={styles.dashboard}>
        <Row>
          <Button onClick={this.handleAddHealthCheckService} type="primary">
            Add Health Check Service
          </Button>
        </Row>
        <Row gutter={24}>
          {listJobHealthCheck?.map((item, index) => (
            <HealthCheckCard item={item} key={index} />
          ))}
        </Row>
        {this.renderModal()}
      </Page>
    );
  }
}
