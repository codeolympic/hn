import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from './devTools'
import reducers from './reducers'
import NewsList from './components/NewsList'

const store = createStore(
    reducers,
    compose(
        // allow async dispatch function
        // 'applyMiddleware' must be the first argument!!
        applyMiddleware(thunk),
        DevTools.instrument()
    )
);

// requires babel-react to compile
render(
    <Provider store={store}>
        <div>
            <NewsList/>
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById('hn')
);
