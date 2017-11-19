// Pages
import { HomePage, NotFoundPage } from '../elements/pages/index';

export default [
  {
    path: '/',
    exact: true,
    ...HomePage
  },
  {
    path: '*',
    ...NotFoundPage
  }
];
