import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignUpPage from './components/SignUpPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
     <Navigation/>
    <h1>Revel</h1>
      <Switch>
        <Route exact path="/" />
        <Route path="/login/" component={LoginFormPage}/>
        <Route path="/signup/" component={SignUpPage}/>
      </Switch>
    </>
  );
}

export default App;
