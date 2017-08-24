/* @flow */

export const USERS_INVALID = 'USERS_INVALID';
export const USERS_REQUESTING = 'USERS_REQUESTING';
export const USERS_FAILURE = 'USERS_FAILURE';
export const USERS_SUCCESS = 'USERS_SUCCESS';

export const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Export this for unit testing more easily
export const fetchUsers = (axios, URL = API_URL) =>
  (dispatch) => {
    dispatch({ type: USERS_REQUESTING });

    return axios.get(URL)
      .then(res => dispatch({ type: USERS_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: USERS_FAILURE, err: err.message }));
  };

const shouldFetchUsers = (state) => {
  if (__DEV__) return true;

  const home = state.home;

  if (home.readyStatus === USERS_SUCCESS) return false; // Preventing double fetching data

  return true;
};


export const fetchUsersIfNeeded = () =>
  (dispatch, getState, axios) => {
    if (shouldFetchUsers(getState())) {
      return dispatch(fetchUsers(axios));
    }

    return null;
  };
