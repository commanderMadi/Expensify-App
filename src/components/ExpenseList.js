import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectedExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="visible-narrow">Expenses</div>
            <div className="visible-large">Expense</div>
            <div className="visible-large">Amount</div>
        </div>
        <div className="list-body">
        {props.expenses.length === 0 && 
            <div className="list-item list-item--nodata">
                <span>No Expenses</span>
            </div>
            }
                {
                    props.expenses.map((expense) => {
                        return <ExpenseListItem {...expense} key={expense.id} />;
                    })
                }
        </div>
    </div>

)


const mapStateToProps = (state) => {
    return {
        expenses: selectedExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpenseList);