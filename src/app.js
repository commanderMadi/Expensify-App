import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configStore';
import {addExpense} from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();


store.dispatch(addExpense({
    description: 'Water Bill',
    amount: 500,
    createdAt: 2017
}));

store.dispatch(addExpense({
    description: 'Gas Bill',
    amount: 5000,
    createdAt: 2015
}));

store.dispatch(addExpense({
    description: 'Rent Bill',
    amount: 400,
    createdAt: 2018
}));

const jsx = (
    <div>
    <Provider store={store}>
        <AppRouter/>
    </Provider>
    </div>
)

ReactDOM.render(jsx, document.getElementById('app'));