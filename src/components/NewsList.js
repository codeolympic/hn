import bulma from 'bulma/css/bulma.css';
import React from 'react';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Rx';
import { fetchNewsIndex } from "../actions/fetchIndex";
import { fetchNews } from "../actions/fetchNews";
import store from '../store';
import OneNews from './OneNews';
import SortBy from './SortBy';

class NewsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchNewsIndexAync();
    }

    componentWillUnmount() {
        scroll$.unsubscribe();
        store.unsubscribe();
    }

    componentDidMount() {
        // reload news for any change of the news index state
        let nextState;
        store.subscribe(() => {
            let currentState = nextState;

            const { newsIndex, offset } = store.getState();
            nextState = newsIndex.newsIds[0] ? newsIndex.newsIds[0].newsId : [];

            if (!nextState || currentState !== nextState) {
                this.props.fetchNewsAync(newsIndex.newsIds, offset);
            }
        });

        scroll$.subscribe(
            (position) => {
                const { newsIndex, offset } = this.props;
                
                if (position.scrollTop + position.clientHeight >= position.scrollHeight) {
                    // scroll to bottom
                    this.props.fetchNewsAync(newsIndex.newsIds, offset);
                } else if (position.scrollTop <= 0) {
                    // scroll to top
                    this.props.fetchNewsIndexAync();
                }
            },
            (err) => console.log(err))
    }

    loadingProgress = () => {
        const { newsList, newsIndex } = this.props;
        let progress = '';
        if (newsIndex.newsIds && newsList) {
            progress = `${newsIndex.newsIds.length}/${newsList.length}`
        }
        return progress;
    }

    render() {
        const { newsList } = this.props;
        const topbarHeight = 50;
        return (
            <div>
                <div style={{ position: 'fixed', width: '100%', height: `${topbarHeight}px`, top: '0' }} className={[bulma['navbar'], bulma['is-warning']].join(' ')}>
                    <div style={{ margin: '0px 15px', textAlign: 'center', alignItems: 'center' }} className={bulma['navbar-brand']}>
                        {this.loadingProgress()}
                        <SortBy />
                    </div>
                </div>
                <div style={{ marginTop: `${topbarHeight * 1.3}px` }}>
                    {newsList.map((oneNews) => <OneNews key={oneNews.id} {...oneNews}></OneNews>)}
                </div>
            </div>
        )
    }
}

const scroll$ = Observable.fromEvent(window, 'scroll')
    .debounceTime(300)
    .map(e => ({
        scrollHeight: e.target.scrollingElement.scrollHeight,
        scrollTop: e.target.scrollingElement.scrollTop,
        clientHeight: e.target.scrollingElement.clientHeight
    }))

const mapStateToProps = ({ newsIndex, newsList, offset }) => ({ newsIndex, newsList, offset });

const mapDispatchToProps = (dispatch) => ({
    fetchNewsIndexAync: () => dispatch(fetchNewsIndex()),
    fetchNewsAync: (newsIds, offset) => dispatch(fetchNews(newsIds, offset))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
