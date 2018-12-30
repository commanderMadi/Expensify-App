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
            {props.totalVisible === 1 &&<h1 className="page-header__title">Viewing <span>1</span> expense totalling <span>{totalFormatted}</span>.</h1>}
            {props.totalVisible > 1 &&<h1 className="page-header__title">Viewing <span>{props.totalVisible}</span> expenses totalling <span>{totalFormatted}</span>.</h1>}
            <div className="page-header__actions">
                <Link className="button" to="/create">Add Expense</Link>
            </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    return {
        totalVisible: visibleExpenses.length,
        totalAmount: getTotalExpenses(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpenseSummary)