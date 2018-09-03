import {
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE,
    UPDATE_OFFSET,
    NO_MORE_NEWS,
    SORT_BY_SCORE,
    SORT_BY_DATE
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
        case SORT_BY_SCORE:
            return sortByScoreDesc(state);
        case SORT_BY_DATE:
            return sortByDateDesc(state);
        default:
            return state;
    }
};

const offset = (state = 0, action) => {
    switch (action.type) {
        case UPDATE_OFFSET:
            return action.offset;
        default:
            return state;
    }
}

const sortByScoreDesc = (oldList) => {
    const newList = [...oldList];
    newList.sort((a, b) => {
        const aScore = parseInt(a.score) || 0;
        const bScore = parseInt(b.score) || 0;
        return bScore - aScore;
    })

    return newList;
}

const sortByDateDesc = (oldList) => {
    const newList = [...oldList];
    newList.sort((a, b) => {
        const aTime = parseInt(a.time) || 0;
        const bTime = parseInt(b.time) || 0;
        return bTime - aTime;
    })

    return newList;
}

export { newsList, offset };
