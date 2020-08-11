import React from 'react';
import { Page } from 'components';
import { connect } from 'dva';
import { stringify } from 'qs';
import { IConnectState } from 'types';
import { router } from 'utils';
import Filter from './components/Filter';
import ListPost from './components/ListPost';
import Modal from './components/Modal';

interface IUserProps extends IConnectState {
  dispatch: Function;
  loading: any;
  location: any;
}

class Posts extends React.PureComponent<IUserProps> {
  handleRefresh = (newQuery?: any) => {
    const { location } = this.props;
    const { query, pathname } = location;

    router.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' },
      ),
    });
  };

  renderFilter() {
    const { location, dispatch } = this.props;
    const { query } = location;

    return (
      <Filter
        filter={{ ...query }}
        onFilterChange={value => {
          this.handleRefresh({
            ...value,
          });
        }}
      />
    );
  }

  renderList() {
    const { dispatch, posts, loading } = this.props;

    return (
      <ListPost
        dataSource={posts?.list}
        loading={loading.effects['posts/getPostList']}
        pagination={posts?.pagination}
        rowSelection={null}
        onChange={page => {
          this.handleRefresh({
            page: page.current,
            per_page: page.pageSize,
          });
        }}
      />
    );
  }

  render() {
    return (
      <Page inner={true}>
        {this.renderFilter()}
        {this.renderList()}
      </Page>
    );
  }
}

export default connect(({ posts, loading }: IConnectState) => ({ posts, loading }))(Posts);
