import { legacy_createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import communityReducer from './community';
import channelReducer from './channel';
import messageReducer from './message';
import userReducer from './user';

const rootReducer = combineReducers({
    session: sessionReducer,
    communities: communityReducer,
    channels: channelReducer,
    messages: messageReducer,
    user: userReducer
});

let enhancer = applyMiddleware(thunk);

if (process.env.NODE_ENV !== 'production') {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState={})=>{
    return legacy_createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;
