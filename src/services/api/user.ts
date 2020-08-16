import {request} from './instance';


export function logout() {
  return request('/me/logout', {
    method: 'DELETE',
  });
}
