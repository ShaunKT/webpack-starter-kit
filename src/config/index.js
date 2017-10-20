module.exports = {
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV || 'development',
  inDevelopment: process.env.NODE_ENV === 'development',
  inProduction: process.env.NODE_ENV === 'production'
};
