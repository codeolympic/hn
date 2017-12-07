import {
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE
} from '../actions/fetch'

const news = (state = [], action) => {
    switch (action.type) {
        case FETCH_NEWS_REQUEST:
            return state;
        case FETCH_NEWS_SUCCESS:
            return action.news;
        case FETCH_NEWS_FAILURE:
            return state;
    }
};

export default news;
