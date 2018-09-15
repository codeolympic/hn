import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HnList from './hn/components/HnList';
import NewsList from './na/components/NewsList';
import store from './store';

// requires babel-react to compile
render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact strict path='/hn' component={HnList} />
                <Route exact strcit path='/na' component={NewsList} />
                <Route component={HnList} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('news')
);
