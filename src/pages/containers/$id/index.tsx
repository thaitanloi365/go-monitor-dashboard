import React from 'react';
import Ansi from 'ansi-to-react';

import Highlighter from 'react-highlight-words';
import { Button, Card, Col, Form, Row, Descriptions, Tooltip, Spin, List, Typography } from 'antd';
import { Page } from 'components';
import { connect } from 'dva';
import { IConnectState } from 'types';
import { Color, colorize } from 'utils';
import Filter from './components/Filter';
import styles from './index.less';

@connect<IConnectState>(({ containerDetail, loading }: IConnectState) => ({ containerDetail, loading }))
export default class ContainerDetail extends React.PureComponent<IConnectState> {
  handleSearch = (keyword: string) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'containerDetail/handleSearch',
      payload: { keyword },
    });
  };

  renderHeader = () => {
    return (
      <div>
        <Filter onFilterChange={filter => this.handleSearch(filter?.keyword)} onSearchChange={this.handleSearch} />
      </div>
    );
  };
  renderLogs = () => {
    const { containerDetail } = this.props;
    const searchWords = (containerDetail?.searchKeyword || '').split(' ');
    return (
      <div className={styles.logContainer}>
        {containerDetail?.logs?.map((item: any) => (
          <div>
            <Ansi useClasses>{item}</Ansi>
          </div>
        ))}
      </div>
    );
  };
  render() {
    const { containerDetail, loading, location } = this.props;

    return (
      <Page inner loading={loading.effects['containerDetail/getContainerDetail']}>
        {this.renderHeader()}
        {this.renderLogs()}
      </Page>
    );
  }
}
