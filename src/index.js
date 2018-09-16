import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './error/NotFound';
import HnList from './hn/components/HnList';
import NewsList from './na/components/NewsList';
import store from './store';

// requires babel-react to compile
render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact strict path='/' component={HnList} />
                <Route exact strict path='/hn' component={HnList} />
                <Route exact strcit path='/na' component={NewsList} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('news')
);
