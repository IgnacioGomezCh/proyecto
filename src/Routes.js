import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Landing from './components/landing';
import AppliedRoute from './components/AppliedRoute';
import NotFound from './components/notFound';
import Section from './components/section';
import Lesson from './components/lessonWithId';
import Profile from './components/profile';
import Contact from './components/contact';
import News from './components/news';
import NewsWithId from './components/newsWithId'

const Routes = ({ childProps }) => (
    <Switch>
        <Route exact path="/" render={() => (
            <Redirect to="/home" />
        )} />
        <AppliedRoute path="/home" exact component={Landing} props={childProps} />
        <AppliedRoute path="/sections" exact component={Section} props={childProps} />
        <AppliedRoute path="/profile" exact component={Profile} props={childProps} />
        <AppliedRoute path="/contact" exact component={Contact} props={childProps} />
        <AppliedRoute path="/lesson/:lessonId" exact component={Lesson} props={childProps} />
        <AppliedRoute path="/news" exact component={News} props={childProps} />
        <AppliedRoute path="/news/:newsId" exact component={NewsWithId} props={childProps} />
        <AppliedRoute props={childProps} component={NotFound} />
    </Switch>
);

export default Routes;