import axios from 'axios';
import { Observable } from 'rxjs/Rx';

let nextId = 0;

const pageSize = 20;

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';
export const UPDATE_OFFSET = 'UPDATE_OFFSET';
export const NO_MORE_NEWS = 'NO_MORE_NEWS';
export const SORT_BY_SCORE = 'SORT_BY_SCORE';
export const SORT_BY_DATE = 'SORT_BY_DATE';

export const fetchNewsRequest = () => {
    return {
        type: FETCH_NEWS_REQUEST
    }
};

export const fetchNewsSuccess = (newsList) => {
    return {
        type: FETCH_NEWS_SUCCESS,
        newsList: newsList.filter((news) => !!news.url)
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

export const sortByScore = () => {
    return {
        type: SORT_BY_SCORE
    }
}

export const sortByDate = () => {
    return {
        type: SORT_BY_DATE
    }
}

export const fetchNews = (newsIds, offset) => {
    return (dispatch) => {
        dispatch(fetchNewsRequest());

        if (offset >= newsIds.length) {
            dispatch(noMoreNews())
            return;
        }

        const observables = [];
        let index = offset;
        for (; index < (newsIds.length && (offset + pageSize)); index++) {
            const ob = Observable.fromPromise(axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsIds[index].newsId}.json`));
            observables.push(ob);
        }

        // instead of doing batch process (Promise.all), using stream process (Observable.merge)
        return Observable.merge(...observables).subscribe(
            (resp) => {
                offset++;
                dispatch(updateOffset(offset));
                dispatch(fetchNewsSuccess([{ id: nextId++, ...resp.data }]));
            }),
            (err) => {
                disptch(fetchNewsFailure(err));
            }
    }
};
