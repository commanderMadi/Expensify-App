import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import ExpenseListFilters from './ExpenseListFilters';

const DashBoard = () => (
    <div>
        <ExpenseSummary/>
        <ExpenseListFilters/>
        <ExpenseList/>


    </div>
);

export default DashBoard;
