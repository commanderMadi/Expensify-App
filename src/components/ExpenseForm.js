import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            err: ''
        }
    }

    onChangeDescription = (e) => {
        const description = e.target.value;
        this.setState(() => ({
            description
        }))
    }

    onChangeNote = (e) => {
        const note = e.target.value;
        this.setState(() => ({
            note
        }))
    }

    onChangeAmount = (e) => {
        const amount = e.target.value;
        if (amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => ({
                amount
            }))
        }
    }

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({
                createdAt
            }))
        }

    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({
            calendarFocused: focused
        }))
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({
                err: 'Please fill the description/amount fields.'
            }))
        }
        else {
            this.setState(() => ({
                err: ''
            }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 100) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf(),
            })
        }

    }
    render() {
        return (
                <form className="form" onSubmit={this.onFormSubmit}>
                {this.state.err && <p className="form__error">{this.state.err}</p>}
                    <input
                        className="text-input"
                        type="text"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        placeholder="Description"
                        autoFocus
                    />
                    <input
                        className="text-input"
                        type="text"
                        value={this.state.amount}
                        onChange={this.onChangeAmount}
                        placeholder="Amount"
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        displayFormat="DD-MMM-YYYY"
                    />

                    <textarea
                        className="textarea"
                        value={this.state.note}
                        onChange={this.onChangeNote}
                        placeholder="Add a note about your expense.">
                    </textarea>
                    <div>
                        <button className="button">Save Expense</button>
                    </div>
                </form>
        )
    }
}