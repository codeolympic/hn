import bulma from 'bulma/css/bulma.css';
import React from 'react';
import moment from 'moment';

class OneNews extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, type, time, by, url, score } = this.props;
        return (
            <div style={{ margin: '20px' }} className={bulma['card']}>
                <header className={bulma['card-header']}>
                    <p style={{ margin: '5px' }} className={[bulma['tag'], bulma['is-warning']].join(' ')}>{type}</p>
                    <p style={{ margin: '5px' }} className={[bulma['tag'], bulma['is-dark']].join(' ')}>{moment.unix(time).format('YYYY-MM-DD')}</p>
                    <a style={{ margin: '5px' }} className={bulma['card-header-title']} href={url}>{title}</a>
                    <p style={{ margin: '5px' }} className={[bulma['tag'], bulma['is-dark']].join(' ')}>by: {by}</p>
                </header>
                <footer className={bulma['card-footer']}>
                    
                    <p className={bulma['card-footer-item']}>score: {score}</p>
                </footer>
            </div>
        )
    }
}

export default OneNews;
