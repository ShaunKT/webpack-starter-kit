// @flow

import Immutable from 'immutable';
import type { fromJS as Immut } from 'immutable';

import { SAY_HELLO } from '../actions/hello';

const initialState = Immutable.fromJS({
  message: 'Click on the button to say hi'
})

const helloReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case SAY_HELLO:
      return state.set('message', action.payload);
    default:
      return state;
  };
}

export default helloReducer;
