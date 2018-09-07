import bulma from 'bulma/css/bulma.css';
import React from 'react';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Rx';
import { fetchHn } from "../actions/fetchHn";
import { fetchHnIndex } from "../actions/fetchHnIndex";
import store from '../store';
import Hn from './Hn';
import SortBy from './SortBy';

class HnList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchHnIndex();
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

            const { hnIndex, hnFetchingStat } = store.getState();
            nextState = hnIndex.newsIds[0] ? hnIndex.newsIds[0].newsId : [];

            if (!nextState || currentState !== nextState) {
                this.props.fetchHn(hnIndex.newsIds, hnFetchingStat.offset);
            }
        });

        scroll$.subscribe(
            (position) => {
                const { hnIndex, hnFetchingStat } = this.props;

                // use innerHeight for mobile browser
                const viewHeight = window.innerHeight || position.clientHeight;

                if (position.scrollTop + viewHeight >= position.scrollHeight) {
                    // scroll to bottom
                    this.props.fetchHn(hnIndex.newsIds, hnFetchingStat.offset);
                } else if (position.scrollTop <= 0) {
                    // scroll to top
                    this.props.fetchHnIndex();
                }
            },
            (err) => console.log(err))
    }

    loadingProgress = () => {
        const { hnList, hnIndex } = this.props;
        let progress = '';
        if (hnIndex.newsIds && hnList) {
            progress = `${hnIndex.newsIds.length}/${hnList.length}`
        }
        return progress;
    }

    render() {
        const { hnList, hnFetchingStat } = this.props;
        const topbarHeight = 50;
        return (
            <div>
                <div style={{ position: 'fixed', width: '100%', height: `${topbarHeight}px`, top: '0' }} className={[bulma['navbar'], bulma['is-warning']].join(' ')}>
                    <progress style={{ position: 'fixed', width: '100%', height: '3px', display: hnFetchingStat.remaining ? 'inline-block' : 'none' }} className={[bulma['progress'], bulma['is-small']].join(' ')} max={hnFetchingStat.total} value={hnFetchingStat.total - hnFetchingStat.remaining}></progress>
                    <div style={{ margin: '0px 15px', textAlign: 'center', alignItems: 'center' }} className={bulma['navbar-brand']}>
                        {this.loadingProgress()}
                        <SortBy />
                    </div>
                </div>
                <div style={{ marginTop: `${topbarHeight * 1.3}px` }}>
                    {hnList.map((hn) => <Hn key={hn.id} {...hn}></Hn>)}
                </div>
            </div>
        )
    }
}

const scroll$ = Observable.fromEvent(window, 'scroll')
    .debounceTime(275)
    .map(e => ({
        scrollHeight: e.target.scrollingElement.scrollHeight,
        scrollTop: e.target.scrollingElement.scrollTop,
        clientHeight: e.target.scrollingElement.clientHeight
    }))

const mapStateToProps = ({ hnIndex, hnList, hnFetchingStat }) => ({ hnIndex, hnList, hnFetchingStat });

const mapDispatchToProps = (dispatch) => ({
    fetchHnIndex: () => dispatch(fetchHnIndex()),
    fetchHn: (newsIds, offset) => dispatch(fetchHn(newsIds, offset))
});

export default connect(mapStateToProps, mapDispatchToProps)(HnList);
