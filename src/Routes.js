import React from 'react';
import { Switch,Redirect,Route } from 'react-router-dom';
import RegisterForm from './components/registerForm';
import Landing from './components/landing';
import LoginForm from './components/loginForm';
import RecoverForm from './components/recoverForm';
import AppliedRoute from './components/AppliedRoute';

const Routes = ({ childProps }) => (
    <Switch>
        <Route exact path="/" render={() => (
            <Redirect to="/home"/>
        )}/>
        <AppliedRoute path="/home" exact component={Landing} props={childProps}/>
        <AppliedRoute path="/register" exact component={RegisterForm} props={childProps}/>
        <AppliedRoute path="/login" exact component={LoginForm} props={childProps}/>
        <AppliedRoute path="/recover" exact component={RecoverForm} props={childProps}/>
    </Switch>
);

export default Routes;