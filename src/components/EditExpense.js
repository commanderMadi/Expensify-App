import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpense extends React.Component {
    onSubmit = updates => {
        this.props.editExpense(this.props.expense.id, updates);
        this.props.history.push('/');
    }
    onClick = () => {
        this.props.startRemoveExpense(this.props.expense)
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
            This is the edit expense page.
            <ExpenseForm
                expense={this.props.expense}
                onSubmit = {this.onSubmit}
            />
            <button onClick={this.onClick}>Remove</button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id ===
    props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    editExpense: (id,expense) => dispatch(editExpense(id, expense)),
    startRemoveExpense: expense => dispatch(startRemoveExpense(expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
