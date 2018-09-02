import { combineReducers } from 'redux';
import { newsList, offset } from './news';
import newsIndex from './newsIndex';

const reducers = combineReducers({
    newsIndex,
    newsList,
    offset
});

export default reducers
