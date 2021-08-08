exports.default = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/sso",
        destination: "/sso/teacher",
        permanent: false,
      },
    ];
  },
};
