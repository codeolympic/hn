import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import NewsList from './components/NewsList';
import store from './store';

// requires babel-react to compile
render(
    <Provider store={store}>
        <div>
            <NewsList />
        </div>
    </Provider>,
    document.getElementById('hn')
);
