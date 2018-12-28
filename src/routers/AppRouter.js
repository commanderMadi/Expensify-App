import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import DashBoard from '../components/DashBoard';
import LoginPage from '../components/LoginPage';
import AddExpense from '../components/AddExpense';
import EditExpense from '../components/EditExpense'
import NotFound from '../components/NotFound'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" exact={true} component={LoginPage}/>
                <PrivateRoute path="/dashboard" component={DashBoard}/>
                <PrivateRoute path ="/create" component={AddExpense}/>
                <PrivateRoute path="/edit/:id" component={EditExpense}/>
                <PublicRoute component={NotFound}/>
            </Switch>
        </div>
    </Router>
)

export default AppRouter;
