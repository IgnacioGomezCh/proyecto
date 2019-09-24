import React from 'react';
import './App.css';
import NavBar from './components/navBar';
import LoginForm from './components/loginForm';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div class="starter-template m-2 mt-5">
        <LoginForm />
      </div>

    </React.Fragment>

  );
}

export default App;
