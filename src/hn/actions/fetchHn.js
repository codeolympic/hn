import { merge } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export const PAGE_SIZE = 20;

export const FETCH_HN_REQUEST = 'FETCH_HN_REQUEST';
export const FETCH_HN_SUCCESS = 'FETCH_HN_SUCCESS';
export const FETCH_HN_FAILURE = 'FETCH_HN_FAILURE';
export const UDATE_HN_PAGE_REMAINING = 'UDATE_HN_PAGE_REMAINING';
export const UPDATE_HN_FETCHING_STAT = 'UPDATE_HN_OFFSET';
export const NO_MORE_HN = 'NO_MORE_HN';

let nextId = 0;

export const fetchHnRequest = () => {
    return {
        type: FETCH_HN_REQUEST
    }
};

export const fetchHnSuccess = (hn) => {
    return {
        type: FETCH_HN_SUCCESS,
        hn
    }
};

export const fetchHnFailure = (err) => {
    return {
        type: FETCH_HN_FAILURE,
        err
    }
};

export const updateHnFetchingStat = (newOffset, newRemaining, total) => {
    return {
        type: UPDATE_HN_FETCHING_STAT,
        offset: newOffset,
        remaining: newRemaining,
        total
    }
};

export const noMoreHn = () => {
    return {
        type: NO_MORE_HN
    }
};

export const fetchHn = (newsIds, offset) => {
    return (dispatch) => {
        if (offset >= newsIds.length) {
            dispatch(noMoreHn())
            return;
        }

        let index = offset;
        let remaining = PAGE_SIZE;

        dispatch(fetchHnRequest());
        dispatch(updateHnFetchingStat(offset, remaining, PAGE_SIZE));

        const observables = [];
        for (; index < (newsIds.length && (offset + PAGE_SIZE)); index++) {
            const ob = ajax(`https://hacker-news.firebaseio.com/v0/item/${newsIds[index].newsId}.json`);
            observables.push(ob);
        }

        // instead of doing batch process (Promise.all), using stream process (Observable.merge)
        return merge(...observables).subscribe(
            (resp) => {
                dispatch(updateHnFetchingStat(++offset, --remaining, PAGE_SIZE));
                dispatch(fetchHnSuccess({ id: nextId++, ...resp.response }));
            },
            (err) => {
                disptch(fetchHnFailure(err));
            });
    }
};
