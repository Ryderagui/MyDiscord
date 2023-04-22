import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';


function App() {
  return (
    <>
    <h1>Hello from App</h1>
    <Switch>
      <Route exact path="/" />
      <Route path="/login/" component={LoginFormPage}/>
    </Switch>
    </>
  );
}

export default App;
