import React from 'react'
import { connect } from 'react-redux'
import { Rx } from 'rx'
import OneNews from './OneNews'
import { fetchNews } from "../actions/fetch";

class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.loadMore.bind(this);

        // TODO: better way to initialize??
        this.loadMore();
    }

    componentWillUnmount() {
        // window.removeEventListener('scroll', this.loadMore);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.loadMore);
    }

    componentDidUpdate() {
        window.addEventListener('scroll', this.loadMore);
    }

    loadMore = () => {
        let { fetchNews } = this.props;

        Rx.Observable.fromEvent(window, 'scroll');

        // TODO:
    };

    render() {
        const { news } = this.props;
        return (
            <ul>
                {news.map(oneNews =>
                    <OneNews key={oneNews.id} {...oneNews}/>
                )}
            </ul>
        )
    }
}

const mapStateToProps = ({ news }) => ({ news });

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNews: () => dispatch(fetchNews())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
