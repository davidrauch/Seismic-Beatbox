// External
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/rootReducer';

// Internal
import initialState from './initialState';

// Configures the store with the reduces, initial state, and middleware
export default function configureStore() {
  // Required to use both devtools and other middleware
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Create the store
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunkMiddleware)
    )
  );
}
