module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'React Webpack Starter',
    titleTemplate: 'React Webpack Starter - %s',
    meta: [
      {
        name: 'description',
        content: 'Universal react webpack starter kit.',
      },
    ],
  },
};
