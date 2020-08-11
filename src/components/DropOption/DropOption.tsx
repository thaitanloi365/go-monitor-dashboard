import { Button, Dropdown, Icon, Menu } from 'antd';
import React from 'react';

interface IProps {
  onMenuClick?: (item: any) => void;
  menuOptions?: Array<{ key: string; name: string }>;
  buttonStyle?: Object;
  dropdownProps?: Object;
}
const DropOption: React.SFC<IProps> = props => {
  const { onMenuClick, menuOptions, buttonStyle, dropdownProps } = props;
  const menu = menuOptions.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>);
  return (
    <Dropdown overlay={<Menu onClick={onMenuClick}>{menu}</Menu>} {...dropdownProps}>
      <Button style={{ border: 'none', ...buttonStyle }}>
        <Icon style={{ marginRight: 2 }} type="bars" />
        <Icon type="down" />
      </Button>
    </Dropdown>
  );
};

export default DropOption;
