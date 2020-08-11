import Axios, { AxiosRequestConfig } from 'axios';
import store from 'store';
import { config } from 'utils';

export const instance = Axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: config.apiBaseURL,
});

function getUrl(cfg: AxiosRequestConfig) {
  if (cfg.baseURL) {
    return cfg.url.replace(config.apiBaseURL, '');
  }
  return cfg.url;
}

instance.interceptors.request.use(
  function(cfg) {
    if (!config.isProduction) {
      const method = cfg.method ?? 'NONE';
      const url = getUrl(cfg) || '';
      console.group('%c Request', 'color: #0086b3; font-weight: bold');
      console.log(`%c [${method?.toUpperCase()}] ${url}\n`, 'color: #0086b3; font-weight: bold');
      console.log(cfg);
      console.groupEnd();
    }
    const token = store.get('token');

    if (cfg.headers.isAuthorized && typeof token === 'string' && token !== '') {
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    delete cfg.headers['isAuthorized'];
    return cfg;
  },
  function(error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function(response) {
    if (!config.isProduction) {
      const method = response.config.method ?? 'NONE';
      const url = getUrl(response.config) || '';
      console.group('%c Response', 'color: #0086b3; font-weight: bold');
      console.log(`%c [${method?.toUpperCase()}] ${url}\n`, 'color: #0086b3; font-weight: bold');
      console.log(response);
      console.groupEnd();
    }
    return response;
  },
  function(error) {
    if (!config.isProduction) {
      const method = error?.config?.method ?? 'NONE';
      const url = getUrl(error?.config) || '';
      console.group('%c Error', 'color: #a71d5d; font-weight: bold');
      console.log(`%c [${method?.toUpperCase()}] ${url}\n`, 'color: #a71d5d; font-weight: bold');
      console.log(JSON.parse(JSON.stringify(error)));
      console.groupEnd();
    }
    return Promise.reject(error);
  },
);
