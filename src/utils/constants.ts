import {IMenus} from 'types';

export const CANCEL_REQUEST_MESSAGE = 'cancel request';

const menus: IMenus = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    id: '2',
    faIcon: 'fab fa-docker',
    name: 'Containers',
    route: '/containers',
  },
  {
    id: '21',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: 'Container Logs',
    route: '/containers/:id',
  },
];

export default {
  menus,
};
