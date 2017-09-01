import { fetchUsersIfNeeded } from '../actions/home';
import { fetchUserIfNeeded } from '../actions/users';
import HomePage from '../containers/Home';
import UserInfoPage from '../containers/UserInfo';
import NotFoundPage from '../containers/NotFound';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage, // Add your route here
    loadData: dispatch =>
      Promise.all([
        dispatch(fetchUsersIfNeeded()), // Register your server-side call action(s) here
      ]),
  },
  {
    path: '/UserInfo/:id',
    component: UserInfoPage,
    loadData: (dispatch, params) => Promise.all([dispatch(fetchUserIfNeeded(params.id))]),
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
