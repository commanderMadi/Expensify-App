import React from 'react';
import getVisibleExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/total';
import { connect } from 'react-redux';
import numeral from 'numeral';

export const ExpenseSummary = (props) => {

    const totalFormatted = numeral(props.totalAmount / 100).format('$0,0.00');
    return (
        <div>

            {props.totalVisible === 1 &&<p>Viewing 1 expense totalling {totalFormatted}.</p>}

            {props.totalVisible > 1 &&<p>Viewing {props.totalVisible} expenses totalling {totalFormatted}.</p>}

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