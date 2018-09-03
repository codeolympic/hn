import {
    FETCH_NEWS_INDEX_REQUEST,
    FETCH_NEWS_INDEX_SUCCESS,
    FETCH_NEWS_INDEX_FAILURE,
} from '../actions/fetchIndex'

const newsIndex = (state = { newsIds: [], inProgress: false }, action) => {
    switch (action.type) {
        case FETCH_NEWS_INDEX_REQUEST:
            return { newsIds: [...state.newsIds], inProgress: action.inProgress };
        case FETCH_NEWS_INDEX_SUCCESS:
            if (action.newsIds && action.newsIds[0] !== state.newsIds[0]) {
                return { newsIds: merge(action.newsIds, state.newsIds), inProgress: action.inProgress }
            } else {
                return { newsIds: [...state.newsIds], inProgress: action.inProgress };
            }
        case FETCH_NEWS_INDEX_FAILURE:
            return { newsIds: [...state.newsIds], inProgress: action.inProgress };
        default:
            return state;
    }
};

const merge = (newList, oldList) => {
    if (!oldList || oldList.length < 1) {
        return newList;
    }

    if (!newList || newList.length < 1) {
        return [...oldList]
    }

    const mergeList = [...oldList];

    let i = 0;
    while (newList[i].newsId !== oldList[0].newsId) {
        mergeList.push(newList[i]);
        i++;
    }

    return mergeList;
}

export default newsIndex;
