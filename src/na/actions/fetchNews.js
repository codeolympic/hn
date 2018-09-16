import { ajax } from 'rxjs/ajax';

export const PAGE_SIZE = 30;
export const DEFAULT_COUNTRY = 'us';

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';
export const NO_MORE_NEWS = 'NO_MORE_NEWS';

let nextId = 0;

export const fetchNewsRequest = () => {
    return {
        type: FETCH_NEWS_REQUEST
    }
};

export const fetchNewsSuccess = (news, nextPage) => {
    return {
        type: FETCH_NEWS_SUCCESS,
        news,
        nextPage
    }
};

export const fetchNewsFailure = (err) => {
    return {
        type: FETCH_NEWS_FAILURE,
        err
    }
};

export const noMoreNews = () => {
    return {
        type: NO_MORE_NEWS
    }
}

export const fetchNews = (nextPage) => {
    return (dispatch) => {
        dispatch(fetchNewsRequest());

        return ajax(`/api/na?country=${DEFAULT_COUNTRY}&page=${nextPage}&pageSize=${PAGE_SIZE}`)
            .subscribe((resp) => {
                const news = format(resp.response);
                if (news && news.length > 0) {
                    dispatch(fetchNewsSuccess(news, ++nextPage));
                } else {
                    dispatch(noMoreNews());
                }
            }, (err) => {
                dispatch(fetchNewsFailure(err));
            });
    }
};

const format = (rawNewsList) => {
    if (!rawNewsList || !rawNewsList.articles) {
        return [];
    }

    return rawNewsList.articles.map((rawNews) => {
        return {
            id: nextId++,
            source: rawNews.source.name,
            type: DEFAULT_COUNTRY,
            title: rawNews.title,
            url: rawNews.url,
            publishedAt: rawNews.publishedAt,
            description: rawNews.description
        }
    })
}
