import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  define: {
    ENV: 'staging',
    VERSION: 'v0.0.29',
    LAST_UPDATE: 1586671497,
    API_BASE_URL: 'https://api-staging.sipscience.com',
    API_PREFIX: '/api/v1',
  },
};

export default config;
