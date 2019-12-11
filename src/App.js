import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';


//Get configs
import config from './config';
//Amplify
import Amplify from 'aws-amplify';

import { withCustomAuthenticator } from './components/withCustomAuthenticator';
import Routes from './Routes';

Amplify.configure({ Auth: config.auth });

class App extends Component {
  render() {
    const childProps = {
      ... this.props.authProps
    }

    return (
      <React.Fragment>
        <Routes childProps={childProps} />
      </React.Fragment>
    )
  }
}

const AppwithRouter = withRouter(App)
const AppWithAuth = withCustomAuthenticator(AppwithRouter)
/*
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="content">
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/recover" exact component={RecoverForm} />
        <Route path="/" exact component={Landing} />
      </div >
    </React.Fragment >

  );
}*/

export default AppWithAuth;
