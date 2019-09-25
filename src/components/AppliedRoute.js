import React from 'react';
import { Route } from 'react-router-dom';

const AppliedRoute = ({ privateRoute, component: C, props: cProps, ...rest }) =>
    <Route {...rest} render={props => < C {...props} {...cProps} component={C} />} />

export default AppliedRoute;