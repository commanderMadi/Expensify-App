import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const DashBoard = () => (
    <div>
        <h1>Dashboard</h1>
        <ExpenseList/>
        <ExpenseListFilters/>

    </div>
);

export default DashBoard;
