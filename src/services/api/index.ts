import request from 'utils/request';

import endpoint from './endpoint';
import config from 'utils/config';

import { instance } from './instance';

const gen = (params: string) => {
  let url = config.apiPrefix + params;
  let method: any = 'GET';

  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    method = paramsArray[0];
    url = config.apiPrefix + paramsArray[1];
  }

  return (data: any) =>
    request({
      baseURL: config.apiBaseURL,
      method,
      url,
      data,
      instance,
    });
};

type APIMap = { [key in keyof typeof endpoint]: Response };

const APIFunction = {};
for (const key in endpoint) {
  APIFunction[key] = gen(endpoint[key]);
}

export default APIFunction as APIMap;
