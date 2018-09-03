import bulma from 'bulma/css/bulma.css';
import React from 'react';
import { connect } from 'react-redux';
import { fetchNewsIndex } from '../actions/fetchIndex';

class CheckUpdates extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { newsIndex, checkUpdatesAsync } = this.props;
        return (
            <button style={{ margin: '15px 2px' }} className={[bulma['button'], bulma['is-small'], bulma['is-dark']].join(' ')} disabled={newsIndex.inProgress} onClick={checkUpdatesAsync}>Check Updates</button>
        );
    }
}

const mapStateToProps = ({ newsIndex }) => ({ newsIndex });

const mapDispatchToProps = (dispatch) => ({
    checkUpdatesAsync: () => dispatch(fetchNewsIndex())
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckUpdates);
