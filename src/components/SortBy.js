import bulma from 'bulma/css/bulma.css';
import React from 'react';
import { connect } from 'react-redux';
import { sortByDate, sortByScore } from '../actions/fetchNews';

class SortBy extends React.Component {
    state = {
        dropdownExpanded: false
    }

    constructor(props) {
        super(props)
    }

    toggleDropdown = () => {
        this.setState({ dropdownExpanded: !this.state.dropdownExpanded })
    }

    render() {
        const { newsList, sortByScore, sortByDate } = this.props;
        return (
            <div style={{ margin: '0px 5px' }} className={this.state.dropdownExpanded ? [bulma['dropdown'], bulma['is-active']].join(' ') : bulma['dropdown']}>
                <div className={bulma['dropdown-trigger']}>
                    <button className={[bulma['button'], bulma['is-small'], bulma['is-light']].join(' ')}
                        aria-haspopup='true'
                        aria-controls='dropdown-menu-ctrl'
                        disabled={newsList.length < 1}
                        onClick={this.toggleDropdown}>
                        <span aria-hidden='true'>Sort</span>
                    </button>
                </div>
                <div className={bulma['dropdown-menu']} role='menu' id='dropdown-menu-ctrl'>
                    <div style={{ width: '50%' }} className={bulma['dropdown-content']}>
                        <a href='#' style={{ paddingTop: '0', paddingBottom: '0' }} className={bulma['dropdown-item']} onClick={sortByScore}>By Score</a>
                        <hr className={bulma['dropdown-divider']}></hr>
                        <a href='#' style={{ paddingTop: '0', paddingBottom: '0' }} className={bulma['dropdown-item']} onClick={sortByDate}>By Date</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ newsList }) => ({ newsList });

const mapDispatchToProps = (dispatch) => ({
    sortByScore: () => dispatch(sortByScore()),
    sortByDate: () => dispatch(sortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
