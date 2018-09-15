import bulma from 'bulma/css/bulma.css';
import React from 'react';
import { connect } from 'react-redux';
import { sortByDate } from '../../common/sorting';

class SortBy extends React.Component {

    constructor(props) {
        super(props)
    }

    /**
     * Add href='#' for back to the top.
     */
    render() {
        const { newsList, sortByDate } = this.props;
        return (
            <div style={{ margin: '0px 10px '}}>
                <a style={{ margin: '0px 5px' }} className={[bulma['has-text-dark'], bulma['is-size-7']].join(' ')} href='#' disabled={!newsList.news || newsList.news.length < 1 || newsList.inProgress} onClick={sortByDate}>By Date</a>
            </div>
        );
    }
}

const mapStateToProps = ({ newsList }) => ({ newsList });

const mapDispatchToProps = (dispatch) => ({
    sortByDate: () => dispatch(sortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
