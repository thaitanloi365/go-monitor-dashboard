import {config} from 'utils';

import {request} from './instance';

export function getListDockerContainer() {
  return request('/container/list', {
    method: 'GET',
  });
}

export function getDockerContainerDetail(id: string) {
  return request(`/container/${id}`, {
    method: 'GET',
  });
}

export function getStreamDockerLogsURL(id: string) {
  return `${config.apiBaseURL}${config.apiPrefix}/container/${id}/stream_logs`;
}
