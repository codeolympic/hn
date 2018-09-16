import bulma from 'bulma/css/bulma.css';
import moment from 'moment';
import React from 'react';

export default class OneNews extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Add target="_blank" attribute to the <a> tag for opening link in new tab
     * Add rel='noopener' or rel='noreferrer' to link to disable window.opener
     */
    render() {
        const { source, type, title, url, publishedAt, description } = this.props;
        return (
            <div style={{ margin: '20px' }} className={bulma['card']}>
                <header className={bulma['card-header']}>
                    <p style={{ margin: '5px' }} className={[bulma['tag'], bulma['is-warning'], bulma['is-hidden-mobile']].join(' ')}>{type}</p>
                    <a style={{ margin: '5px' }} className={bulma['card-header-title']} href={url} target='_blank' rel='noreferrer'>{title}</a>
                    <p style={{ margin: '5px' }} className={[bulma['tag'], bulma['is-dark']].join(' ')}>{moment.utc(publishedAt).format('YYYY-MM-DD')}</p>
                    <p style={{ margin: '5px' }} className={[bulma['tag'], bulma['is-dark'], bulma['is-hidden-mobile']].join(' ')}>{source}</p>
                </header>
                <div hidden={!description} className={bulma['card-content']}>
                    <div style={{ fontSize: '75%' }} className={bulma['content']}>
                        {description}
                    </div>
                </div>
            </div>
        )
    }
}
