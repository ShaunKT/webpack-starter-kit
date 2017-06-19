import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as RouteMap from './asyncRoute';

const AppRouter = () => (
    <Router>
        <div>
            <Route exact path='/' component={RouteMap.Home} />
            <Route path='/about' component={RouteMap.About} />
        </div>
    </Router>
);

export default AppRouter;

