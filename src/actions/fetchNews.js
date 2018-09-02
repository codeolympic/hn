import axios from 'axios';

let nextId = 0;

const batchSize = 20;

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';
export const UPDATE_OFFSET = 'UPDATE_OFFSET';
export const NO_MORE_NEWS = 'NO_MORE_NEWS';

export const fetchNewsRequest = () => {
    return {
        type: FETCH_NEWS_REQUEST
    }
};

export const fetchNewsSuccess = (newsList) => {
    return {
        type: FETCH_NEWS_SUCCESS,
        newsList: newsList
    }
};

export const fetchNewsFailure = (err) => {
    return {
        type: FETCH_NEWS_FAILURE,
        err
    }
};

export const updateOffset = (newOffset) => {
    return {
        type: UPDATE_OFFSET,
        offset: newOffset
    }
};

export const noMoreNews = () => {
    return {
        type: NO_MORE_NEWS
    }
};

export const fetchNews = (newsIndex, offset) => {
    return (dispatch) => {
        dispatch(fetchNewsRequest());

        if (offset >= newsIndex.length) {
            dispatch(noMoreNews())
            return;
        }

        const promises = [];
        let index = offset;
        for (; index < (newsIndex.length && (offset + batchSize)); index++) {
            const promise = axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsIndex[index].newsId}.json`);
            promises.push(promise);
        }

        return Promise.all(promises).then(
            (resp) => {
                const newsList = resp.map((resp) => {
                    return {
                        id: nextId++,
                        ...resp.data,
                    } 
                });

                dispatch(updateOffset(index));
                dispatch(fetchNewsSuccess(newsList))
            }),
            (err) => {
                disptch(fetchNewsFailure(err));
            }
    }
};
