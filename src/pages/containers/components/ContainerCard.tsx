import React, { useState } from 'react';
import { Card, Tag, Row, Col } from 'antd';
import { formatDate } from 'utils/date';
import { Ellipsis } from 'ant-design-pro';
import { DropOption } from 'components';
import { router } from 'utils';
import styles from './ContainerCard.less';
interface IProps {
  item: IContainer;
}
const ContainerCard: React.SFC<IProps> = props => {
  const { item } = props;
  const {
    Names,
    State,
    Status,
    Created,
    Id,
    Command,
    Image,
    ImageID,
    Ports,
    NetworkSettings,
    Mounts,
    HostConfig,
    Labels,
  } = item;

  const [key, setKey] = useState('container');

  const handleMenuClick = (item: any) => {
    switch (item.key) {
      case 'view_logs':
        router.push(`/containers/${Id}`);
        break;
    }
  };
  const tabList = [
    {
      key: 'container',
      tab: 'Container',
    },
    {
      key: 'networks',
      tab: 'Networks',
    },
    {
      key: 'mounts',
      tab: 'Mounts',
    },
    {
      key: 'hosts',
      tab: 'Hosts',
    },
    {
      key: 'ports',
      tab: 'Ports',
    },
    {
      key: 'labels',
      tab: 'Labels',
    },
  ];

  const containerContent = [
    { title: 'ID', value: Id },
    { title: 'Command', value: Command },
    { title: 'Image ID', value: ImageID },
    { title: 'Image Name', value: Image },
    { title: 'Image Name', value: Image },
  ];
  const tabContentList = {
    container: (
      <React.Fragment>
        {containerContent.map((item, index) => (
          <React.Fragment key={index}>
            <Row style={{ marginBottom: '5px' }}>
              <Col lg={2} xs={5}>
                {item.title}
              </Col>
              <Col lg={22} xs={19}>
                <Ellipsis tooltip>{item.value}</Ellipsis>
              </Col>
            </Row>
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
    networks: (
      <React.Fragment>
        {Object.keys(NetworkSettings?.Networks).map((network, index) => (
          <React.Fragment key={index}>
            <h3>{network}</h3>
            {Object.keys(NetworkSettings?.Networks[network]).map((key, index) => (
              <Row style={{ marginBottom: '5px', marginLeft: '10px' }} type="flex" key={index}>
                <Col lg={4} xs={12}>
                  {key}
                </Col>
                <Col lg={20} xs={12}>
                  <Ellipsis>{NetworkSettings?.Networks[network][key]}</Ellipsis>
                </Col>
              </Row>
            ))}
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
    mounts: (
      <React.Fragment>
        {Mounts.map((mount, index) => (
          <React.Fragment key={index}>
            {Object.keys(mount).map((key, index) => (
              <Row style={{ marginBottom: '5px' }} type="flex" key={index}>
                <Col lg={2} xs={6}>
                  {key}
                </Col>
                <Col lg={22} xs={18}>
                  <Ellipsis>{mount[key]}</Ellipsis>
                </Col>
              </Row>
            ))}
            <br />
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
    hosts: (
      <React.Fragment>
        {Object.keys(HostConfig).map((key, index) => (
          <React.Fragment key={index}>
            <Row style={{ marginBottom: '5px' }} type="flex" key={index}>
              <Col lg={2} xs={8}>
                {key}
              </Col>
              <Col lg={22} xs={16}>
                <Ellipsis>{HostConfig[key]}</Ellipsis>
              </Col>
            </Row>
            <br />
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
    ports: (
      <React.Fragment>
        {Ports.map((port, index) => (
          <React.Fragment key={index}>
            {Object.keys(port).map((key, index) => (
              <Row style={{ marginBottom: '5px' }} type="flex" key={index}>
                <Col xs={8} lg={2}>
                  {key}
                </Col>
                <Col xs={16} lg={22}>
                  <Ellipsis>{port[key]}</Ellipsis>
                </Col>
              </Row>
            ))}
            <br />
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
    labels: (
      <React.Fragment>
        {Object.keys(Labels).map((key, index) => (
          <React.Fragment key={index}>
            <Row style={{ marginBottom: '5px' }} type="flex" key={index}>
              <Col xl={8} lg={12} sm={24}>
                {key}
              </Col>
              <Col xl={16} lg={12} sm={24}>
                <Ellipsis>{Labels[key]}</Ellipsis>
              </Col>
            </Row>
            <br />
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
  };

  const name = Names?.[0] || '';
  const statusColor = State === 'running' ? '#108ee9' : '#f50';
  const createdAt = formatDate(Created, 'MMM, DD YYYY HH:MM A');
  const containerName = name.replace('/', '');
  const renderHeader = () => {
    return (
      <Row>
        <Col className={styles.margin} sm={6} md={5} lg={7}>
          {containerName}
        </Col>
        <Col sm={{ span: 17, offset: 1 }} md={{ span: 18, offset: 1 }} lg={{ span: 16, offset: 1 }}>
          <Row className={styles.row} type="flex" align="top">
            <Col style={{ textAlign: 'center' }}>
              <Tag color={statusColor}>{State.toUpperCase()}</Tag>
              <h5>
                <Ellipsis style={{ marginTop: '7px' }} tooltip>
                  {Status}
                </Ellipsis>
              </h5>
            </Col>
            <Col className={styles.middle}>
              <h4>CREATED AT</h4>
              <h5>
                <Ellipsis tooltip>{createdAt}</Ellipsis>
              </h5>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <DropOption onMenuClick={handleMenuClick} menuOptions={[{ key: 'view_logs', name: 'View Logs' }]} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  return (
    <Card title={renderHeader()} tabList={tabList} activeTabKey={key} onTabChange={key => setKey(key)}>
      {tabContentList[key]}
    </Card>
  );
};

export default ContainerCard;
