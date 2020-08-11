import router from 'umi/router';
import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from 'axios';
import { CANCEL_REQUEST_MESSAGE } from './constants';

const codeMessage = {
  400: 'There was an error in the request, and the server did not create or modify data.',
  401: 'The user does not have permissions.',
  403: 'The user is authorized, but access is prohibited.',
  404: 'The request was made for a record that does not exist, and the server did not perform an operation.',
  422: 'When creating an object, a validation error occurred.',
  500: 'A server error occurred. Please check the server.',
  502: 'Gateway error.',
  503: 'Services are unavailable and the server is temporarily overloaded or maintained.',
  504: 'Gateway timed out.',
};

const { CancelToken } = axios;
// @ts-ignore
window.cancelRequest = new Map();

export interface IRequestOption extends AxiosRequestConfig {
  isAuthorized?: boolean;
  instance: AxiosInstance;
}
const request = (option: IRequestOption) => {
  const { data, method, instance, isAuthorized = true, ...other } = option;

  return instance({
    ...other,
    data: method === 'GET' ? null : data,
    params: method === 'GET' ? data : null,
    cancelToken: new CancelToken(cancel => {
      // @ts-ignore
      window.cancelRequest.set(Symbol(Date.now()), {
        pathname: window.location.pathname,
        cancel,
      });
    }),
  })
    .then(response => {
      const { statusText, status, data } = response;

      let result = {};
      if (typeof data === 'object') {
        result = data;
        if (Array.isArray(data)) {
          // @ts-ignore
          result.list = data;
        }
      } else {
        // @ts-ignore
        result.data = data;
      }

      const res = {
        success: true,
        message: statusText,
        statusCode: status,
        data: result,
      };

      return Promise.resolve(res);
    })
    .catch((error: AxiosError) => {
      const { response, message } = error;

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return Promise.reject({
          success: false,
        });
      }

      let msg;
      let statusCode;

      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;

        msg = codeMessage[data.code] || data.message || statusText;
        if (data.code) {
          msg = `[${data.code}] ${msg}`;
        }
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }
      if (statusCode === 401 || statusCode === 403) {
        // @ts-ignore
        window.g_app._store.dispatch({
          type: 'app/sessionTimeout',
        });
      }

      if (statusCode === 403) {
        router.push('/403');
      }
      if (statusCode <= 504 && statusCode >= 500) {
        router.push('/500');
      }
      if (statusCode >= 404 && statusCode < 422) {
        router.push('/404');
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      });
    });
};

export default request;
