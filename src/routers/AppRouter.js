import React from 'react';
import {BrowserRouter, Switch, Link, Route, NavLink} from 'react-router-dom';
import DashBoard from '../components/DashBoard';
import AddExpense from '../components/AddExpense';
import EditExpense from '../components/EditExpense'
import Header from '../components/Header';
import Help from '../components/Help';
import NotFound from '../components/NotFound'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" exact={true} component={DashBoard}/>
                <Route path ="/create" component={AddExpense}/>
                <Route path ="/help" component={Help}/>
                <Route path="/edit/:id" component={EditExpense}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
