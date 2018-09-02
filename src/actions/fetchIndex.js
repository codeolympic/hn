import axios from 'axios'

let nextId = 0;

export const FETCH_NEWS_INDEX_REQUEST = 'FETCH_NEWS_INDEX_REQUEST';
export const FETCH_NEWS_INDEX_SUCCESS = 'FETCH_NEWS_INDEX_SUCCESS';
export const FETCH_NEWS_INDEX_FAILURE = 'FETCH_NEWS_INDEX_FAILURE';

export const fetchNewsIndexRequest = () => {
    return {
        type: FETCH_NEWS_INDEX_REQUEST
    }
};

export const fetchNewsIndexSuccess = (newsIndex) => {
    return {
        type: FETCH_NEWS_INDEX_SUCCESS,
        newsIndex: newsIndex.map((newsId) => {
            return {
                id: nextId++,
                newsId
            }
        })
    }
};

export const fetchNewsIndexFailure = (err) => {
    return {
        type: FETCH_NEWS_INDEX_FAILURE,
        err
    }
};

export const fetchNewsIndex = () => {
    return (dispatch) => {
        dispatch(fetchNewsIndexRequest());

        return axios.get('https://hacker-news.firebaseio.com/v0/topstories.json').then(
            (resp) => {
                dispatch(fetchNewsIndexSuccess(resp.data));
            },
            (err) => {
                dispatch(fetchNewsIndexFailure(err));
            }
        )
    }
};
