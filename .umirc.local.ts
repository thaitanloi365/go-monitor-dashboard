import {IConfig} from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  define: {
    ENV: 'local',
    VERSION: 'v0.0.29',
    LAST_UPDATE: 1586671497,
    API_BASE_URL: 'http://localhost:8080',
    API_PREFIX: '/api/v1/admin',
  },
};

export default config;
