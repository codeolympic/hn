import axios from 'axios'

let nextId = 0;

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchNewsRequest = () => {
    return {
        type: FETCH_NEWS_REQUEST
    }
};

export const fetchNewsSuccess = (news) => {
    return {
        type: FETCH_NEWS_SUCCESS,
        news: news.map((oneNews) => {
            return {
                id: nextId++,
                ...oneNews
            }
        })
    }
};

export const fetchNewsFailure = (err) => {
    return {
        type: FETCH_NEWS_FAILURE,
        err
    }
};

export const fetchNews = () => {
    return (dispatch) => {
        dispatch(fetchNewsRequest());

        // TODO: fetch each page
        return axios.get('/api/news').then(
            (resp) => dispatch(fetchNewsSuccess(toNews(resp.data))),
            (err) => dispatch(fetchNewsFailure(err))
        );
    }
};

let toNews = (respData) => {
    return respData['hits'].map((hit) => {
        return {
            title: hit['title'],
            created: hit['created_at'],
            author: hit['author'],
            text: hit['text'],
            link: hit['url']
        }
    });
};
