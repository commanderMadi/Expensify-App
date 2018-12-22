import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('should dispatch with default values', ()=>{
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove an expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action);
    
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const newExpense = {
        description: ' A brand new expense',
        note: '',
        createdAt: 0,
        amount: 10000000
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an existing expense', () => {
    const description = 'Gumball';
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            description
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state[0].description).toBe(description);
});

test('should not edit an existing expense if id not found', () => {
    const description = 'Gumball';
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            description
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});