import { IMenus } from 'types';

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
    breadcrumbParentId: '1',
    name: 'Users',
    icon: 'user',
    route: '/users',
  },
  {
    id: '21',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: 'User Detail',
    route: '/users/:id',
  },
  {
    id: '3',
    breadcrumbParentId: '1',
    name: 'Businesses',
    icon: 'home',
    route: '/businesses',
  },
  {
    id: '31',
    menuParentId: '-1',
    breadcrumbParentId: '3',
    name: 'Business Menu Details',
    route: '/businesses/:id/menu',
  },

  {
    id: '4',
    breadcrumbParentId: '1',
    name: 'Posts',
    icon: 'shopping-cart',
    route: '/posts',
  },
  {
    id: '41',
    menuParentId: '-1',
    breadcrumbParentId: '4',
    name: 'Post Details',
    route: '/posts/:id',
  },
];

export default {
  menus,
};
