import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Landing from './components/landing';
import AppliedRoute from './components/AppliedRoute';
import NotFound from './components/notFound';
import Section from './components/section';
import Lesson from './components/lessonWithId';

const Routes = ({ childProps }) => (
    <Switch>
        <Route exact path="/" render={() => (
            <Redirect to="/home" />
        )} />
        <AppliedRoute path="/home" exact component={Landing} props={childProps} />
        <AppliedRoute path="/sections" exact component={Section} props={childProps} />
        <AppliedRoute path="/lesson/:lessonId" exact component={Lesson} props={childProps}/>
        <AppliedRoute props={childProps} component={NotFound} />
    </Switch>
);

export default Routes;