import bulma from 'bulma/css/bulma.css';
import React from 'react';
import { connect } from 'react-redux';
import { sortByDate, sortByScore } from '../actions/fetchNews';

class SortBy extends React.Component {

    constructor(props) {
        super(props)
    }

    /**
     * Add href='#' for back to the top.
     */
    render() {
        const { newsIndex, newsList, sortByScore, sortByDate } = this.props;
        return (
            <div style={{ margin: '0px 10px '}}>
                <a style={{ margin: '0px 5px' }} className={[bulma['has-text-dark'], bulma['is-size-7']].join(' ')} href='#' disabled={!newsList || newsList.length < 1 || newsIndex.inProgress} onClick={sortByScore}>By Score</a>
                <a style={{ margin: '0px 5px' }} className={[bulma['has-text-dark'], bulma['is-size-7']].join(' ')} href='#' disabled={!newsList || newsList.length < 1 || newsIndex.inProgress} onClick={sortByDate}>By Date</a>
            </div>
        );
    }
}

const mapStateToProps = ({ newsIndex, newsList }) => ({ newsIndex, newsList });

const mapDispatchToProps = (dispatch) => ({
    sortByScore: () => dispatch(sortByScore()),
    sortByDate: () => dispatch(sortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
