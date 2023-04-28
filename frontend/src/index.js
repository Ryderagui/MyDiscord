import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session'
import * as communityActions from './store/community'
import * as channelActions from './store/channel'


const store = configureStore();
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.communityActions = communityActions;
  window.channelActions = channelActions;
}

function Root () {
  return(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  )
}
const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root/>
    </React.StrictMode>,
    document.getElementById('root')
);
}
if(
  sessionStorage.getItem("X-CSRF-Token") === null ||
  sessionStorage.getItem("currentUserId") === null
  ){
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication(); 

}; 