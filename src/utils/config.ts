export default {
  siteName: 'Goda Admin',
  copyright: '©2020 Goda',
  logoPath: require('../assets/images/logo.png'),
  apiBaseURL: API_BASE_URL,
  apiPrefix: API_PREFIX,
  version: VERSION,
  lastUpdate: LAST_UPDATE,
  fixedHeader: true, // sticky primary layout header
  env: ENV,
  isProduction: ENV === 'production',
  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [
        /(\/(en|zh))*\/login/,
        /(\/(en|zh))*\/password\/update/,
        /(\/(en|zh))*\/password\/reset/,
      ],
    },
  ],
};
