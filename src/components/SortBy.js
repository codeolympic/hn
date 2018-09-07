import bulma from 'bulma/css/bulma.css';
import React from 'react';
import { connect } from 'react-redux';
import { sortByDate, sortByScore } from '../actions/fetchHn';

class SortBy extends React.Component {

    constructor(props) {
        super(props)
    }

    /**
     * Add href='#' for back to the top.
     */
    render() {
        const { hnIndex, hnList, sortByScore, sortByDate } = this.props;
        return (
            <div style={{ margin: '0px 10px '}}>
                <a style={{ margin: '0px 5px' }} className={[bulma['has-text-dark'], bulma['is-size-7']].join(' ')} href='#' disabled={!hnList || hnList.length < 1 || hnIndex.inProgress} onClick={sortByScore}>By Score</a>
                <a style={{ margin: '0px 5px' }} className={[bulma['has-text-dark'], bulma['is-size-7']].join(' ')} href='#' disabled={!hnList || hnList.length < 1 || hnIndex.inProgress} onClick={sortByDate}>By Date</a>
            </div>
        );
    }
}

const mapStateToProps = ({ hnIndex, hnList }) => ({ hnIndex, hnList });

const mapDispatchToProps = (dispatch) => ({
    sortByScore: () => dispatch(sortByScore()),
    sortByDate: () => dispatch(sortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
