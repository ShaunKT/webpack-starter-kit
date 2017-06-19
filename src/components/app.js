import React from 'react';
// import { browserHistory } from 'react-router-dom';
import { Route, Router } from 'react-router';

import Home from './content/home';
import About from './content/about';


const AppRouter = () => (
    <Router>
        <Route path='/' component={Home} />
        <Route path='/address' component={About} />
    </Router>
);

export default AppRouter;
