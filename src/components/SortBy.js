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
            <div style={{ margin: '0px 3px '}}>
                <a href='#' className={[bulma['button'], bulma['is-small'], bulma['is-text']].join(' ')} disabled={!newsList || newsList.length < 1 || newsIndex.inProgress} onClick={sortByScore}>By Score</a>
                <a href='#' className={[bulma['button'], bulma['is-small'], bulma['is-text']].join(' ')} disabled={!newsList || newsList.length < 1 || newsIndex.inProgress} onClick={sortByDate}>By Date</a>
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
