import { Icon, Menu } from 'antd';
import React, { Fragment, PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import store from 'store';
import Navlink from 'umi/navlink';
import withRouter from 'umi/withRouter';
import { arrayToTree, pathMatchRegexp, queryAncestors } from 'utils';

const { SubMenu } = Menu;

interface IMenuProps extends RouteComponentProps {
  menus: any[];
  theme: 'light' | 'dark';
  isMobile: boolean;
  onCollapseChange: (collapse: boolean) => void;
  collapsed: boolean;
}

@withRouter
export default class SiderMenu extends PureComponent<Partial<IMenuProps>> {
  state = {
    openKeys: store.get('openKeys') || [],
  };

  onOpenChange = (openKeys: any) => {
    const { menus } = this.props;
    const rootSubmenuKeys = menus.filter(_ => !_.menuParentId).map(_ => _.id);

    const latestOpenKey = openKeys.find((key: any) => this.state.openKeys.indexOf(key) === -1);

    let newOpenKeys = openKeys;
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : [];
    }

    this.setState({
      openKeys: newOpenKeys,
    });
    store.set('openKeys', newOpenKeys);
  };

  generateMenus = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <Fragment>
                {item.icon && <Icon type={item.icon} />}
                {item.faIcon && <span aria-hidden="true" className={item.faIcon} />}
                <span>{item.name}</span>
              </Fragment>
            }
          >
            {this.generateMenus(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.id}>
          <Navlink to={item.route || '#'}>
            {item.icon && <Icon type={item.icon} />}
            {item.faIcon && <span aria-hidden="true" className={item.faIcon} />}
            <span>{item.name}</span>
          </Navlink>
        </Menu.Item>
      );
    });
  };

  render() {
    const { collapsed, theme, menus, location, isMobile, onCollapseChange } = this.props;

    // Generating tree-structured data for menu content.
    const menuTree = arrayToTree(menus, 'id', 'menuParentId');

    // Find a menu that matches the pathname.
    const currentMenu = menus.find(_ => _.route && pathMatchRegexp(_.route, location.pathname));

    // Find the key that should be selected according to the current menu.
    const selectedKeys = currentMenu ? queryAncestors(menus, currentMenu, 'menuParentId').map(_ => _.id) : [];

    const menuProps = collapsed
      ? {}
      : {
          openKeys: this.state.openKeys,
        };

    return (
      <Menu
        mode="inline"
        theme={theme}
        onOpenChange={this.onOpenChange}
        selectedKeys={selectedKeys}
        onClick={
          isMobile
            ? () => {
                onCollapseChange(true);
              }
            : undefined
        }
        {...menuProps}
      >
        {this.generateMenus(menuTree)}
      </Menu>
    );
  }
}
