import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './content/home';
import About from './content/about';

const AppRouter = () => (
    <Router>
        <Route exact path='/' component={Home} >
            <Route path='/about' component={About} />
        </Route>
    </Router>
);

export default AppRouter;

