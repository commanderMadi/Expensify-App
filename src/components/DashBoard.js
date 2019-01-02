import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import ExpenseListFilters from './ExpenseListFilters';
import WelcomeMessage from './WelcomeMessage';
import { firebase } from '../firebase/firebase';

const DashBoard = () => (
    <div>
        <WelcomeMessage
        userName={firebase.auth().currentUser}
        />
        <ExpenseSummary/>
        <ExpenseListFilters/>
        <ExpenseList/>


    </div>
);

export default DashBoard;
