import {request} from './instance';

export function login(data: any) {
  return request('/login', {
    method: 'POST',
    data,
  });
}
