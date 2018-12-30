import React from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import { Provider } from 'react-redux'
import 'normalize.css/normalize.css';
import AppRouter, { history } from './routers/AppRouter'
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import configureStore from './store/configStore';
import './styles/styles.scss';
import Loading from './components/Loading';


const store = configureStore();
const jsx = (
    <div>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </div>
)
let hasBeenRendered = false;

const renderApp = () => {
    if (!hasBeenRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasBeenRendered = true;
    }
}
ReactDOM.render(<Loading/>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('logged in!')
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                console.log(history.location.pathname);
                history.push('/dashboard');
            }
        });
    }
    else {
        console.log('logged out!');
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
})