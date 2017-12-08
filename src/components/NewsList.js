import React from 'react'
import { connect } from 'react-redux'
import OneNews from './OneNews'
import { fetchNews } from "../actions/fetch";

class NewsList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const { fetchNews } = this.props;
        fetchNews()
    }

    // TODO: infinite list
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

const mapStateToProps = ({ news }) => ({ news });

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNews: () => dispatch(fetchNews())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
