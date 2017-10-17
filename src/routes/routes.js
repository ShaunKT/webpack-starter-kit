import HomePage from '../elements/pages/home';
import CounterPage from '../elements/components/counter/counterContainer';
import DashboardPage from '../elements/containers/dashboard/dashboardContainer';
import NotFoundPage from '../elements/pages/notFound';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/dashboard',
    exact: true,
    component: DashboardPage
  },
  {
    path: '/counter',
    exact: true,
    component: CounterPage
  },
  {
    path: '*',
    component: NotFoundPage
  }
];
