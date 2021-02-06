import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import DestinationsNavigator from './navigation/DestinationsNavigator';
import destinationsReducer from './store/reducers/destinations';

const rootReducer = combineReducers({
  destinations: destinationsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <DestinationsNavigator />
    </Provider>
  );
}
