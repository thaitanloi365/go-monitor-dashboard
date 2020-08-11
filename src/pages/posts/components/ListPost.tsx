import React from 'react';
import { Table, Card, Tooltip, Modal, Tag } from 'antd';
import { ColumnProps, TableProps } from 'antd/lib/table';
import { IPost } from 'types';
import { formatDate } from 'utils/date';
import Link from 'umi/link';
import styles from './ListPost.less';

const { confirm } = Modal;

interface IListTabProps extends TableProps<IPost> {
  onDeleteItem?: (recordId: string | number) => void;
  onEditItem?: (record: IPost) => void;
}

class ListTab extends React.PureComponent<IListTabProps> {
  handleMenuClick = (record: any, e: any) => {
    const { onDeleteItem, onEditItem } = this.props;

    if (e.key === '1') {
      onEditItem(record);
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk() {
          onDeleteItem(record.id);
        },
      });
    }
  };

  render() {
    const { ...tableProps } = this.props;

    const columns: Array<ColumnProps<IPost>> = [
      {
        title: 'ID',
        key: 'id',
        width: 80,
        render: (_, record) => <Link to={`/post/${record.id}`}>{record?.id}</Link>,
      },
      {
        title: 'Title',
        key: 'title',
        width: 200,
        render: (_, record) => <span>{record.title}</span>,
      },
      {
        title: 'Content',
        key: 'content',
        width: 200,
        render: (_, record) => <span>{record.content}</span>,
      },

      {
        title: 'Image',
        key: 'image',
        width: 200,
        render: (_, record) => <img src={record.thumbnail_url} />,
      },

      {
        title: 'Created At',
        key: 'created_at',
        width: 200,
        render: (_, record) => <span>{formatDate(record?.created_at)}</span>,
      },
      {
        title: 'Updated At',
        key: 'updated_at',
        width: 200,
        render: (_, record) => <span>{formatDate(record?.updated_at)}</span>,
      },
    ];

    return (
      <Card title="Posts">
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
            showTotal: total => `Total ${total} Items`,
          }}
          className={styles.table}
          bordered={true}
          scroll={{ x: 'calc(700px + 25%)' }}
          columns={columns}
          rowKey={record => `${record.id}`}
        />
      </Card>
    );
  }
}

export default ListTab;
