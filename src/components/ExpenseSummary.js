import React from 'react';
import getVisibleExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/total';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';

export const ExpenseSummary = (props) => {

    const totalFormatted = numeral(props.totalAmount / 100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
            {props.expenses.length < 1 && <h1 className="page-header__title">No expenses created. Maybe <Link className="link" to="/create">create</Link> a new one? 🤔</h1>}
            {props.expenses.length > 1 && props.totalVisible === 0 && <h1 className="page-header__title">No expenses matching your applied filters.</h1>}
            {props.totalVisible === 1 &&<h1 className="page-header__title">Viewing <span>1</span> expense totalling <span>{totalFormatted}</span>.</h1>}
            {props.totalVisible > 1 &&<h1 className="page-header__title">Viewing <span>{props.totalVisible}</span> expenses totalling <span>{totalFormatted}</span>.</h1>}
            <div className="page-header__actions">
                <Link className="button" to="/create">Create Expense</Link>
            </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    return {
        expenses: state.expenses,
        totalVisible: visibleExpenses.length,
        totalAmount: getTotalExpenses(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpenseSummary)