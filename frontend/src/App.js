import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignUpPage from './components/SignUpPage';
import UserPage from './components/UserPage';
import FrontPage from './components/FrontPage';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={FrontPage}/>
        <Route path="/login/" component={LoginFormPage}/>
        <Route path="/signup/" component={SignUpPage}/>
        <Route path="/users/:userid/:communityid/:channelid" component={UserPage} />
        <Route path="/users/:userid/:communityid" component={UserPage} />
        <Route path="/users/:userid" component={UserPage} />
      </Switch>
    </>
  );
}

export default App;
