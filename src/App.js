import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar';
import RegisterForm from './components/registerForm';
import Landing from './components/landing';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="content">
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/" exact component={Landing} />
      </div >
    </React.Fragment >

  );
}

export default App;
