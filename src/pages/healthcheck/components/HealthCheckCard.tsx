import React, { useState } from 'react';
import { Card, Tag, Row, Col } from 'antd';
import { formatDate } from 'utils/date';
import { Ellipsis } from 'ant-design-pro';
import { DropOption } from 'components';

interface IProps {
  item: IJobHealthCheck;
}
const HealthCheckCard: React.SFC<IProps> = props => {
  const { item } = props;
  const {} = item;

  // const name = Names?.[0] || '';
  // const statusColor = State === 'running' ? '#108ee9' : '#f50';
  // const createdAt = formatDate(Created, 'MMM, DD YYYY HH:MM A');
  // const containerName = name.replace('/', '');
  const renderHeader = () => {
    return (
      <Row>
        <Col span={12}>
          {/* {containerName} */}
          <h5>{/* <Ellipsis style={{ marginTop: '7px' }}>Created At: {createdAt}</Ellipsis> */}</h5>
        </Col>
        <Col style={{ textAlign: 'right' }} span={12}>
          {/* <Tag style={{ marginRight: 0 }} color={statusColor}>
            {State.toUpperCase()}
          </Tag> */}
          <h5>{/* <Ellipsis style={{ marginTop: '7px' }}>{Status}</Ellipsis> */}</h5>
        </Col>
      </Row>
    );
  };

  const renderRow = (title: string, value: React.ReactText) => {
    return (
      <Row>
        <Col sm={4} lg={6}>
          {title}
        </Col>
        <Col sm={20} lg={18}>
          <Ellipsis>{value}</Ellipsis>
        </Col>
      </Row>
    );
  };
  return (
    <Col sm={24} md={24} lg={12} xl={8}>
      <Card style={{ width: '100%' }} title={renderHeader()}>
        {/* {renderRow('ID', Id)}
        {renderRow('Image Name', Image)}
        {renderRow('Image ID', ImageID)} */}
      </Card>
    </Col>
  );
};

export default HealthCheckCard;
