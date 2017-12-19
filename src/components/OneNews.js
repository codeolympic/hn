import React from 'react'

class OneNews extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.id!== this.props.id;
    }

    render() {
        const { title, created, link } = this.props;
        return (
            <li>
                <div>
                    <h3>{title}</h3>
                    <p>{created}</p>
                    <a href={link}>{link}</a>
                </div>
            </li>
        )
    }
}

export default OneNews;
