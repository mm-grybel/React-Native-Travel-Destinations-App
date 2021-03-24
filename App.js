import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import DestinationsNavigator from './navigation/DestinationsNavigator';
import destinationsReducer from './store/reducers/destinations';
import { init } from './helpers/db';

init()
    .then(() => {
        console.log('Initialized the database.');
    })
    .catch(err => {
        console.log('Initializing the database failed.');
        console.log(err);
    });

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
