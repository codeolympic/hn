import React from 'react'
import { connect } from 'react-redux'
import { Observable } from 'rxjs/Rx'
import OneNews from './OneNews'
import { fetchNews } from "../actions/fetch";

class NewsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchNews();
    }

    componentWillUnmount() {
        scroll$.unsubscribe();
    }

    componentDidMount() {
        scroll$.subscribe(
            (e) => {
                this.props.fetchNews();
            },
            (err) => {
                console.log(err);
            })
    }

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

const mapStateToProps = ({ news }) => ({ news });

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNews: () => dispatch(fetchNews())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
