import React from 'react';
import { Router } from 'react-router';
import { browserHistory } from 'react-router-dom';

const App = () => (
    <Router history={browserHistory} routes={routes} />
);

export default App;