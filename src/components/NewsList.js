import React from 'react'
import { connect } from 'react-redux'
import { Observable } from 'rxjs/Rx'
import OneNews from './OneNews'
import { fetchNews } from "../actions/fetch";

class NewsList extends React.Component {
    constructor(props) {
        super(props);
    }

    // TODO: slow
    componentWillMount() {
        this.props.fetchNews();
    }

    componentWillUnmount() {
        scroll$.unsubscribe();
    }

    componentDidMount() {
        scroll$.subscribe(
            (e) => {
                // TODO: dispatch action
                console.log('valid scroll')
            },
            (err) => {
                console.log(err);
            })
    }

    render() {
        const {news} = this.props;
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
    .throttleTime(300)
    .map(e => ({
        scrollHeight: e.target.scrollingElement.scrollHeight,
        scrollTop: e.target.scrollingElement.scrollTop,
        clientHeight: e.target.scrollingElement.clientHeight
    }))
    .pairwise()
    .filter(positions => {
        return (positions[0].scrollTop < positions[1].scrollTop)
            && (positions[1].scrollTop + positions[1].clientHeight === positions[1].scrollHeight)
    });

const mapStateToProps = ({news}) => ({news});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNews: () => dispatch(fetchNews())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
