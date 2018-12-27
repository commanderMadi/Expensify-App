import React from 'react';
import { shallow } from 'enzyme';
import { EditExpense } from '../../components/EditExpense';
import expenses from '../fixtures/expenses';


let startEditExpense, startRemoveExpense, wrapper, history;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<EditExpense
        startEditExpense = {startEditExpense}
        startRemoveExpense = {startRemoveExpense}
        history={history}
        expense={expenses[1]}/>)
});


test('should render edit expense component correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should edit expense on submit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id,expenses[1]);
});

test('should startRemoveExpense on remove button click', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[1]);
    expect(wrapper).toMatchSnapshot();
});