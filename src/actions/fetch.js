import axios from 'axios'

let nextId = 0;
let nextPage = 1;
let lastPage = -1;

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
        }),
        page: nextPage++
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
        if (nextPage === lastPage) {
            dispatch(fetchNewsFailure(`duplicate fetch: ${nextPage}`));
        } else {
            dispatch(fetchNewsRequest());
            lastPage = nextPage;
            return axios.get(`/api/news?page=${nextPage}`).then(
                (resp) => {
                    dispatch(fetchNewsSuccess(toNews(resp.data), nextPage))
                },
                (err) => dispatch(fetchNewsFailure(err))
            );
        }
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
