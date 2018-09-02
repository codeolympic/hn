import bulma from 'bulma/css/bulma.css';
import React from 'react';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Rx';
import { fetchNewsIndex } from "../actions/fetchIndex";
import { fetchNews } from "../actions/fetchNews";
import store from '../store';
import OneNews from './OneNews';

class NewsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchNewsIndexAync();
    }

    componentWillUnmount() {
        scroll$.unsubscribe();
    }

    componentDidMount() {
        /**
         * Fetching news if index has any change.
         * 
         * TODO: implement auto updating
         * 
         * NOTE: 
         * - maintain a class variable or React state to hold the previous state
         * won't work here for some reason
         * 
         * - hacker news api will append new id to the head of the list
         */
        let nextState;
        store.subscribe(() => {
            let currentState = nextState;

            const { newsIndex, offset } = store.getState();
            nextState = newsIndex[0].newsId;

            if (currentState !== nextState) {
                this.props.fetchNewsAync(newsIndex, offset);
            }
        });

        scroll$.subscribe(
            (e) => {
                const { newsIndex, offset } = store.getState();
                this.props.fetchNewsAync(newsIndex, offset)
            },
            (err) => console.log(err))
    }

    render() {
        const { newsList, newsIndex } = this.props;
        return (
            <div>
                <div className={[bulma['navbar'], bulma['is-warning']].join(' ')}>
                    <div style={{margin: '2px 15px', textAlign: 'center', alignItems: 'center'}} className={bulma['navbar-brand']}>total news: {newsIndex.length}</div>
                </div>
                {newsList.map((oneNews) => <OneNews key={oneNews.id} {...oneNews}></OneNews>)}
            </div>
        )
    }
}

/*
 * Return the 'scroll' event only when scrolling down.
 *
 * Note: No need to attach the event listener.
 */
const scroll$ = Observable.fromEvent(window, 'scroll')
    .debounceTime(300)
    .map(e => ({
        scrollHeight: e.target.scrollingElement.scrollHeight,
        scrollTop: e.target.scrollingElement.scrollTop,
        clientHeight: e.target.scrollingElement.clientHeight
    }))
    .filter((position) => {
        return position.scrollTop + position.clientHeight === position.scrollHeight;
    });

const mapStateToProps = ({ newsIndex, newsList, offset }) => ({ newsIndex, newsList, offset });

const mapDispatchToProps = (dispatch) => ({
    fetchNewsIndexAync: () => dispatch(fetchNewsIndex()),
    fetchNewsAync: (newsIndex, offset) => dispatch(fetchNews(newsIndex, offset))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
