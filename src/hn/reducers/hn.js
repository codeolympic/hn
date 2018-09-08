import {
    FETCH_HN_REQUEST,
    FETCH_HN_SUCCESS,
    FETCH_HN_FAILURE,
    UPDATE_HN_FETCHING_STAT,
    NO_MORE_HN,
    SORT_BY_SCORE,
    SORT_BY_DATE
} from '../actions/fetchHn'

const hnList = (state = [], action) => {
    switch (action.type) {
        case FETCH_HN_REQUEST:
            return state;
        case FETCH_HN_SUCCESS:
            if (action.hn.url) {
                return [...state, action.hn];
            } else {
                return state;
            }
        case FETCH_HN_FAILURE:
            return state;
        case NO_MORE_HN:
            return state;
        case SORT_BY_SCORE:
            return sortByScoreDesc(state);
        case SORT_BY_DATE:
            return sortByDateDesc(state);
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

export { hnList, hnFetchingStat };
