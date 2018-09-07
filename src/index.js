import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import HnList from './components/HnList';
import store from './store';

// requires babel-react to compile
render(
    <Provider store={store}>
        <div>
            <HnList />
        </div>
    </Provider>,
    document.getElementById('hackerNews')
);
