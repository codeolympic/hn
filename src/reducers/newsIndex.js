import {
    FETCH_NEWS_INDEX_REQUEST,
    FETCH_NEWS_INDEX_SUCCESS,
    FETCH_NEWS_INDEX_FAILURE,
} from '../actions/fetchIndex'

const newsIndex = (state = [], action) => {
    switch (action.type) {
        case FETCH_NEWS_INDEX_REQUEST:
            return state;
        case FETCH_NEWS_INDEX_SUCCESS:
            return [...state, ...action.newsIndex]
        case FETCH_NEWS_INDEX_FAILURE:
            return state;
        default:
            return state;
    }
};

export default newsIndex;
