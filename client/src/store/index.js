import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export const configureStore = () => {
  const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose;
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      composeEnhancers
    )
  );
}