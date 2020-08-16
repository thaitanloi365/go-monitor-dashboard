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
    icon: 'docker',
    name: 'Containers',
    route: '/containers',
  },
  {
    id: '21',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: 'Container Details',
    route: '/containers/:id',
  },
];

export default {
  menus,
};
