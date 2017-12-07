import React from 'react'
import NewsList from './NewsList'

class Frame extends React.Component {
    render() {
        return (
            <div>
                <div>header</div>
                <div>
                    <NewsList/>
                </div>
            </div>
        )
    }
}
