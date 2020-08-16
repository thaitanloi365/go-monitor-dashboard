import { request } from './instance';

export function login(data: any) {
  return request('/login', {
    method: 'GET',
    data,
  });
}

export function logout() {
  return request('/logout', {
    method: 'DELETE',
  });
}
