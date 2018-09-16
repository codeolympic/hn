import moment from 'moment';
import { sortByDateDesc, SORT_BY_DATE } from '../../common/sorting';
import { FETCH_NEWS_FAILURE, FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, NO_MORE_NEWS } from '../actions/fetchNews';

const newsList = (state = { news: [], inProgress: false, error: '', nextPage: 1 }, action) => {
    switch(action.type) {
        case FETCH_NEWS_REQUEST:
            return Object.assign({}, state, { inProgress: true });
        case FETCH_NEWS_SUCCESS:
            return { news: [...state.news, ...action.news], inProgress: false, error: '', nextPage: action.nextPage }
        case FETCH_NEWS_FAILURE:
            return Object.assign({}, state, { inProgress: false, error: 'Fetching news failed, please try again later' });
        case NO_MORE_NEWS:
            return Object.assign({}, state, { inProgress: false, error: 'No more news, please try again later' });
        case SORT_BY_DATE:
            return { news: sortByDateDesc(state.news, (oneNews) => moment.utc(oneNews.publishedAt).valueOf()), inProgress: false, error: state.error, nextPage: state.nextPage };
        default:
            return state;
    }
}

export default newsList;
