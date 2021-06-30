// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // Your existing module.exports
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/checkin/manage/create',
        destination: '/checkin/manage/create/classroom',
        permanent: false,
      },
      {   // to be compatible with v1
        source: '/checkin/:org/:uuid',
        destination: '/checkin/:uuid',
        permanent: true,
      },
      {   // to be compatible with v1
        source: '/admin',
        destination: '/welcome',
        permanent: false, // as I don't know that would we use 'admin' later.
      },
      {   // to be compatible with v1
        source: '/checkin/create',
        destination: '/checkin/manage/create',
        permanent: false,
      },
      {   // to be compatible with v1
        source: '/checkin/previous',
        destination: '/checkin/manage/previous',
        permanent: false,
      },
      {   // to be compatible with v1
        source: '/checkin/monitor',
        has: [
          {
            type: 'query',
            key: 'id',
          },
        ],
        destination: '/checkin/manage/dashboard/:id',
        permanent: false,
      },
      {   // to be compatible with v1
        source: '/config/register',
        destination: '/config/info',
        permanent: false,
      },
    ];
  },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting,
// to ensure your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
