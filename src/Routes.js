import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import RegisterForm from './components/registerForm';
import Landing from './components/landing';
import LoginForm from './components/loginForm';
import RecoverForm from './components/recoverForm';
import AppliedRoute from './components/AppliedRoute';
import NotFound from './components/notFound';
import Section from './components/section';

const Routes = ({ childProps }) => (
    <Switch>
        <Route exact path="/" render={() => (
            <Redirect to="/home" />
        )} />
        <AppliedRoute path="/home" exact component={Landing} props={childProps} />
        <AppliedRoute path="/sections" exact component={Section} props={childProps} />
        <AppliedRoute component={NotFound} />
    </Switch>
);

export default Routes;