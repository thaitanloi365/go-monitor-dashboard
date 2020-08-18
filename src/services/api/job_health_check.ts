import { request } from './instance';

export function getListJobHealthCheck() {
  return request('/job_healthcheck/list', {
    method: 'GET',
  });
}

export function createJobHealthCheck(data: any) {
  return request('/job_healthcheck', {
    method: 'POST',
    data,
  });
}

export function removeJobHealthCheck(tag: string) {
  return request(`/job_healthcheck/${tag}`, {
    method: 'DELETE',
  });
}

export function getJobHealthCheck(tag: string) {
  return request(`/job_healthcheck/${tag}`, {
    method: 'GET',
  });
}
