import React, { useState } from 'react';
import { Card, Tag, Row, Col } from 'antd';
import { formatDate } from 'utils/date';
import { Ellipsis } from 'ant-design-pro';
import { DropOption } from 'components';
import { router } from 'utils';
interface IProps {
  item: Container;
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

  const handleClick = (event: any) => {
    event.preventDefault();
    router.push(`/containers/${Id}`);
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
          <Row style={{ marginBottom: '5px' }}>
            <Col lg={2} xs={5}>
              {item.title}
            </Col>
            <Col lg={22} xs={19}>
              <Ellipsis tooltip>{item.value}</Ellipsis>
            </Col>
          </Row>
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
          <React.Fragment>
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
                <Col xs={4} lg={2}>
                  {key}
                </Col>
                <Col xs={20} lg={22}>
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
          <React.Fragment>
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
        <Col sm={12} lg={7}>
          {containerName}
        </Col>
        <Col sm={12} lg={{ span: 16, offset: 1 }}>
          <Row className="mt-3" type="flex" justify="space-between" align="top">
            <Col style={{ textAlign: 'center' }} lg={{ span: 4, offset: 12 }} sm={8}>
              <Tag color={statusColor}>{State.toUpperCase()}</Tag>
              <h5>
                <Ellipsis style={{ marginTop: '7px' }} tooltip>
                  {Status}
                </Ellipsis>
              </h5>
            </Col>
            <Col style={{ textAlign: 'right' }} lg={4} sm={8}>
              <h4>CREATED AT</h4>
              <h5>
                <Ellipsis tooltip>{createdAt}</Ellipsis>
              </h5>
            </Col>
            <Col style={{ textAlign: 'right' }} lg={4} sm={8}>
              <DropOption menuOptions={[{ key: 'view_logs', name: 'View Logs' }]} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  return (
    <Card
      onClick={handleClick}
      title={renderHeader()}
      tabList={tabList}
      activeTabKey={key}
      onTabChange={key => setKey(key)}
    >
      {tabContentList[key]}
    </Card>
  );
};

export default ContainerCard;
