import { FETCH_HN_INDEX_FAILURE, FETCH_HN_INDEX_REQUEST, FETCH_HN_INDEX_SUCCESS } from '../actions/fetchHnIndex';

const hnIndex = (state = { newsIds: [], inProgress: false }, action) => {
    switch (action.type) {
        case FETCH_HN_INDEX_REQUEST:
            return { newsIds: [...state.newsIds], inProgress: true };
        case FETCH_HN_INDEX_SUCCESS:
            if (action.newsIds && action.newsIds[0] !== state.newsIds[0]) {
                return { newsIds: merge(action.newsIds, state.newsIds), inProgress: false }
            } else {
                return { newsIds: [...state.newsIds], inProgress: false };
            }
        case FETCH_HN_INDEX_FAILURE:
            return { newsIds: [...state.newsIds], inProgress: false };
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

export default hnIndex;
