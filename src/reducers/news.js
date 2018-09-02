import {
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE,
    UPDATE_OFFSET,
    NO_MORE_NEWS
} from '../actions/fetchNews'

const newsList = (state = [], action) => {
    switch (action.type) {
        case FETCH_NEWS_REQUEST:
            return state;
        case FETCH_NEWS_SUCCESS:
            return [...state, ...action.newsList];
        case FETCH_NEWS_FAILURE:
            return state;
        case NO_MORE_NEWS:
            return state;    
        default:
            return state;
    }
};

const offset = (state = 0, action) => {
    switch(action.type) {
        case UPDATE_OFFSET:
            return action.offset;
        default:
            return state;
    }
}

export { newsList, offset };
