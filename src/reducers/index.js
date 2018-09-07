import { combineReducers } from 'redux';
import { hnList, hnFetchingStat } from './hn';
import hnIndex from './hnIndex';

const reducers = combineReducers({
    hnIndex,
    hnList,
    hnFetchingStat
});

export default reducers
