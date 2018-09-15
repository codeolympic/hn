import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { hnFetchingStat, hnList } from './hn/reducers/hn';
import hnIndex from './hn/reducers/hnIndex';
import newsList from './na/reducers/news';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    hnIndex,
    hnList,
    hnFetchingStat,
    newsList
});

const store = createStore(
    reducers,
    composeEnhancers(
        // allow async dispatch function
        // 'applyMiddleware' must be the first argument!!
        applyMiddleware(thunk)
    )
);

export default store;
