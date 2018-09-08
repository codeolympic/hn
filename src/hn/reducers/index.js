import { combineReducers } from 'redux';
import { hnList, hnFetchingStat } from './hn';
import hnIndex from './hnIndex';

const hnReducers = combineReducers({
    hnIndex,
    hnList,
    hnFetchingStat
});

export default hnReducers
