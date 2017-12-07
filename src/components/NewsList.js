import React from 'react'
import { connect } from 'react-redux'
import OneNews from './OneNews'

class NewsList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { news } = this.props;
        return (
            <ul>
                {news.map(oneNews =>
                    <OneNews key={oneNews.id} {...oneNews}/>
                )}
            </ul>
        )
    }
}

export default connect(({ news }) => ({ news }), (dispatch) => {})(NewsList);
