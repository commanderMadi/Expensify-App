import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import ExpenseListFilters from './ExpenseListFilters';

const DashBoard = () => (
    <div>
        <h1>Dashboard</h1>
        <ExpenseSummary/>
        <ExpenseList/>
        <ExpenseListFilters/>

    </div>
);

export default DashBoard;
