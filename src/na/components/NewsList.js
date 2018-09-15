import bulma from 'bulma/css/bulma.css';
import React from 'react';
import { connect } from 'react-redux';
import infinityScroll$ from '../../common/scrolling';
import { fetchNews } from "../actions/fetchNews";
import OneNews from './OneNews';
import SortBy from './SortBy';

class NewsList extends React.Component {

    /**
     * Height of the top bar.
     */
    TOPBAR_HEIGHT = 50;

    /**
     * Threshold distance to the list bottom that trigger infinite scroller loading.
     */
    LOADING_THRESHOLD_FACTOR = .9;

    constructor(props) {
        super(props);

        const { fetchNews, newsList } = this.props;

        fetchNews(newsList.nextPage);
    }

    componentWillUnmount() {
        scroll$.unsubscribe();
    }

    componentDidMount() {
        infinityScroll$.subscribe(
            (position) => {
                const { newsList } = this.props;

                // use innerHeight for mobile browser
                const viewHeight = window.innerHeight || position.clientHeight;

                if (!newsList.inProgress && position.scrollTop + viewHeight >= (position.scrollHeight * this.LOADING_THRESHOLD_FACTOR)) {
                    // scroll to bottom
                    this.props.fetchNews(newsList.nextPage);
                }
            },
            (err) => console.log(err))
    }

    render() {
        const { newsList } = this.props;

        return (
            <div>
                <div hidden={newsList.error}>
                    <div style={{ position: 'fixed', width: '100%', height: `${this.TOPBAR_HEIGHT}px`, top: '0' }} className={[bulma['navbar'], bulma['is-warning']].join(' ')}>
                        <div style={{ margin: '0px 15px', textAlign: 'center', alignItems: 'center' }} className={bulma['navbar-brand']}>
                            <SortBy />
                        </div>
                    </div>
                </div>
                <div hidden={!newsList.error} className={[bulma['notification'], bulma['is-danger']].join(' ')}>
                    Fetching news failed, please try again later!
                </div>
                <div style={{ marginTop: `${this.TOPBAR_HEIGHT * 1.3}px` }}>
                    {newsList.news.map((oneNews) => <OneNews key={oneNews.id} {...oneNews}></OneNews>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ newsList }) => ({ newsList });

const mapDispatchToProps = (dispatch) => ({
    fetchNews: (nextPage) => dispatch(fetchNews(nextPage))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
