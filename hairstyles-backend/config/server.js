module.exports = ({ env }) => {
  const isDevelopment = env('NODE_ENV') === 'development';

  return {
    host: env('HOST', '0.0.0.0'),
    port: isDevelopment ? env.int('DEV_PORT', 1338) : env.int('PROD_PORT', 1338),
    app: {
      keys: env.array('APP_KEYS'),
    },
  };
};
