import bulma from 'bulma/css/bulma.css';
import moment from 'moment';
import React from 'react';

export default class Hn extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Add target="_blank" attribute to the <a> tag for opening link in new tab
     * Add rel='noopener' or rel='noreferrer' to link to disable window.opener
     */
    render() {
        const { title, type, time, by, url, score } = this.props;
        return (
            <div style={{ margin: '20px' }} className={bulma['card']}>
                <header className={bulma['card-header']}>
                    <p style={{ margin: '5px' }} className={[bulma['tag'], bulma['is-warning'], bulma['is-hidden-mobile']].join(' ')}>{type}</p>
                    <a style={{ margin: '5px' }} className={bulma['card-header-title']} href={url} target='_blank' rel='noreferrer'>{title}</a>
                    <p style={{ margin: '5px' }} className={[bulma['tag'], bulma['is-dark']].join(' ')}>{moment.unix(time).format('YYYY-MM-DD')}</p>
                    <p style={{ margin: '5px' }} className={[bulma['tag'], bulma['is-dark'], bulma['is-hidden-mobile']].join(' ')}>by: {by}</p>
                </header>
                <footer className={bulma['card-footer']}>
                    <p className={bulma['card-footer-item']}>score: {score}</p>
                </footer>
            </div>
        )
    }
}
