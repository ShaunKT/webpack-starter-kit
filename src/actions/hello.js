// @flow

// Isomorphic Fetch - function to make asynchronous calls
import 'isomorphic-fetch';

import { createAction } from 'redux-actions';

export const SAY_HELLO = 'SAY_HELLO';

export const sayHello = createAction(SAY_HELLO);
