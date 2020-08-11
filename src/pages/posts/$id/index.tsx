import React from 'react';
import { Tooltip, Button, Card, Col, Form, Row, Tag, Spin } from 'antd';
import { Page } from 'components';
import { connect } from 'dva';
import { IConnectProps, IConnectState, IFormProps } from 'types';
import { formatDate } from 'utils/date';
import { getTabStatusColor } from 'utils/theme';
import styles from './index.less';

interface IUserDetailProps extends IFormProps, IConnectProps, IConnectState {}

class PostDetail extends React.PureComponent<IUserDetailProps> {
  renderAttribute(title: string, value: any, hasDivider = true) {
    return (
      <React.Fragment>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
        {hasDivider && <div className={styles.divider} />}
      </React.Fragment>
    );
  }

  renderStatus(title: string, element: React.ReactElement) {
    return (
      <React.Fragment>
        <div className={styles.title}>{title}</div>
        {element}
      </React.Fragment>
    );
  }

  render() {
    const { postDetail, dispatch } = this.props;
    const { currentItem } = postDetail;

    return (
      <Page inner={true}>
        <Row gutter={[16, 16]}>
          <Col lg={{ offset: 1, span: 7 }} xs={{ offset: 4, span: 16 }}>
            <div className={styles.row}>
              <h2>Ticket Name: {currentItem?.ticket_name}</h2>
            </div>
          </Col>
          <Col lg={{ offset: 1, span: 14 }} xs={{ offset: 2, span: 18 }}>
            <Row type="flex">
              <Col style={{ marginRight: '20px' }}>
                {this.renderStatus(
                  'STATUS',
                  <Tooltip title={currentItem?.status_description}>
                    {' '}
                    <Tag color={getTabStatusColor(currentItem?.status)}>{currentItem?.status}</Tag>
                  </Tooltip>,
                )}
              </Col>
              <Col style={{ marginRight: '30px' }}>
                {this.renderStatus('OPENED AT', <span>{formatDate(currentItem?.opened_at)}</span>)}
              </Col>
              <Col style={{ marginRight: '20px' }}>
                {this.renderStatus('CLOSED AT', <span>{formatDate(currentItem?.closed_at)}</span>)}
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <Row gutter={[16, 16]}>
          <Col lg={{ offset: 1, span: 7 }}>
            <Card title="Attributes">
              {this.renderAttribute('id', currentItem?.id)}
              {this.renderAttribute('status', currentItem?.status)}
              {this.renderAttribute('status_description', currentItem?.status_description)}
              {this.renderAttribute('ticket_id', currentItem?.ticket_id)}
              {this.renderAttribute('ticket_name', currentItem?.ticket_name)}
              {this.renderAttribute('ticket_number', currentItem?.ticket_number)}
              {this.renderAttribute('user_id', currentItem?.user_id)}
              {this.renderAttribute('merchant_id', currentItem?.merchant_id)}
              {this.renderAttribute('location_id', currentItem?.location_id)}
              {this.renderAttribute('location_name', currentItem?.location_name)}
              {this.renderAttribute('employee_id', currentItem?.employee_id)}
              {this.renderAttribute('revenue_center_id', currentItem?.revenue_center_id)}
              {this.renderAttribute('order_type_id', currentItem?.order_type_id)}
              {this.renderAttribute('payment_intent_id', currentItem?.payment_intent_id)}
              {this.renderAttribute('opened_at', currentItem?.opened_at)}
              {this.renderAttribute('closed_at', currentItem?.closed_at)}
              {this.renderAttribute('created_at', currentItem?.created_at)}
              {this.renderAttribute('updated_at', currentItem?.updated_at)}
              {this.renderAttribute('deleted_at', currentItem?.deleted_at)}
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default connect(({ postDetail, loading }: IConnectState) => ({ postDetail, loading }))(
  Form.create()(PostDetail),
);
