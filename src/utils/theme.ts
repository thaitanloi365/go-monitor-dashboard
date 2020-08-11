import { ITabStatus, ISubscribeStatus, IOrderStatus } from 'types';
import constants from './constants';
const Color = {
  green: '#64ea91',
  blue: '#8fc9fb',
  purple: '#d897eb',
  red: '#f69899',
  yellow: '#f8c82e',
  peach: '#f797d6',
  borderBase: '#e5e5e5',
  borderSplit: '#f4f4f4',
  grass: '#d6fbb5',
  sky: '#c1e0fc',
  blue2: '#40a9ff',
  red2: '#ff4d4f',
};

export function getTabStatusColor(status: ITabStatus) {
  return constants.tabStatusTagColors[status] || '#108ee9';
}

export function getSubscribeStatusColor(status: ISubscribeStatus) {
  return constants.subscribeColors[status] || '#108ee9';
}

export function getOrderStatusColor(status: IOrderStatus) {
  return constants.orderStatusTagColors[status] || '#108ee9';
}

export function getSubscriptionStateColor(state: number) {
  if (state === 0) {
    return '#40a9ff';
  }

  return "#ff4d4f"
}
export default Color;
