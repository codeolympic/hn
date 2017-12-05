import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from './devTools'
import reducers from './reducers'

const store = createStore(
    reducers,
    compose(
        DevTools.instrument(),
        // allow async dispatch function
        applyMiddleware(thunk)
    )
);

// requires babel-react to compile
render(
    <Provider store={store}>
        <div>
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById('hn')
);
