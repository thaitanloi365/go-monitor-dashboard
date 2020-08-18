import { IMenus } from 'types';

export const CANCEL_REQUEST_MESSAGE = 'cancel request';

const routeName = {
  containers: '/containers',
  healthcheck: '/healthcheck',
};
const menus: IMenus = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Containers',
    route: routeName.containers,
  },
  {
    id: '11',
    menuParentId: '-1',
    breadcrumbParentId: '1',
    name: 'Container Logs',
    route: '/containers/:id',
  },
  {
    id: '2',
    icon: 'smile',
    name: 'Healthcheck',
    route: routeName.healthcheck,
  },
];

export default {
  menus,
  routeName,
};
