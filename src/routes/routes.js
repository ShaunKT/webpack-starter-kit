// Pages
import {
  HomePage,
  AboutPage,
  ServicesPage,
  ProductsPage,
  ContactPage,
  NotFoundPage
} from '../elements/pages/index';

export default [
  {
    path: '/',
    exact: true,
    ...HomePage
  },
  {
    path: '/about',
    exact: true,
    ...AboutPage
  },
  {
    path: '/services',
    exact: true,
    ...ServicesPage
  },
  {
    path: '/products',
    exact: true,
    ...ProductsPage
  },
  {
    path: '/contact',
    exact: true,
    ...ContactPage
  },
  {
    path: '*',
    ...NotFoundPage
  }
];
