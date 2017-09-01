

import _ from 'lodash';

import {
  USERS_INVALID,
  USERS_REQUESTING,
  USERS_FAILURE,
  USERS_SUCCESS,
} from '../actions/home';

const initialState = {
  readyStatus: USERS_INVALID,
  err: null,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_REQUESTING:
      return _.assign({}, state, { readyStatus: USERS_REQUESTING });
    case USERS_FAILURE:
      return _.assign({}, state, {
        readyStatus: USERS_FAILURE,
        err: action.err,
      });
    case USERS_SUCCESS:
      return _.assign({}, state, {
        readyStatus: USERS_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
