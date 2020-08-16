import { request } from './instance';
import { config } from 'utils';

export function getListDockerContainer() {
  return request('/docker/container/list', {
    method: 'GET',
  });
}

export function getDockerContainerDetail(id: string) {
  return request(`/docker/container/${id}`, {
    method: 'GET',
  });
}

export function getStreamDockerLogsURL(id: string) {
  return `${config.apiBaseURL}${config.apiPrefix}/docker/container/${id}/stream_logs`;
}
