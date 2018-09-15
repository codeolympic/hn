import { sortByDateDesc, sortByScoreDesc, SORT_BY_DATE, SORT_BY_SCORE } from '../../common/sorting';
import { FETCH_HN_FAILURE, FETCH_HN_REQUEST, FETCH_HN_SUCCESS, NO_MORE_HN, UPDATE_HN_FETCHING_STAT } from '../actions/fetchHn';

const hnList = (state = { news: [], inProgress: false }, action) => {
    switch (action.type) {
        case FETCH_HN_REQUEST:
            return { news: state.news, inProgress: true };
        case FETCH_HN_SUCCESS:
            if (action.hn.url) {
                return { news: [...state.news, action.hn], inProgress: false };
            } else {
                return { news: state.news, inProgress: false };
            }
        case FETCH_HN_FAILURE:
            return { news: state.news, inProgress: false };
        case NO_MORE_HN:
            return { news: state.news, inProgress: false };
        case SORT_BY_SCORE:
            return { news: sortByScoreDesc(state.news), inProgress: false };
        case SORT_BY_DATE:
            return { news: sortByDateDesc(state.news, (oneNews) => oneNews.time), inProgress: false };
        default:
            return state;
    }
};

const hnFetchingStat = (state = { offset: 0, remaining: 0 }, action) => {
    switch (action.type) {
        case UPDATE_HN_FETCHING_STAT:
            return { offset: action.offset, remaining: action.remaining, total: action.total };
        default:
            return state;
    }
}

export { hnList, hnFetchingStat };
