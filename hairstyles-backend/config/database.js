module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'strapi_hairstyles_dev'),
      user: env('DATABASE_USERNAME', 'strapi-hairstyles-dev'),
      password: env('DATABASE_PASSWORD', 'Develop123!'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
