import 'rxjs/add/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';

let nextId = 0;

export const FETCH_HN_INDEX_REQUEST = 'FETCH_HN_INDEX_REQUEST';
export const FETCH_HN_INDEX_SUCCESS = 'FETCH_HN_INDEX_SUCCESS';
export const FETCH_HN_INDEX_FAILURE = 'FETCH_HN_INDEX_FAILURE';

export const fetchHnIndexRequest = () => {
    return {
        type: FETCH_HN_INDEX_REQUEST
    }
};

export const fetchHnIndexSuccess = (newsIds) => {
    return {
        type: FETCH_HN_INDEX_SUCCESS,
        newsIds: newsIds.map((newsId) => {
            return {
                id: nextId++,
                newsId,
            }
        })
    }
};

export const fetchHnIndexFailure = (err) => {
    return {
        type: FETCH_HN_INDEX_FAILURE,
        err
    }
};

export const fetchHnIndex = () => {
    return (dispatch) => {
        dispatch(fetchHnIndexRequest());

        return Observable.ajax('https://hacker-news.firebaseio.com/v0/topstories.json').subscribe(
            (resp) => {
                dispatch(fetchHnIndexSuccess(resp.response));
            },
            (err) => {
                dispatch(fetchHnIndexFailure(err));
            }
        )
    }
};
