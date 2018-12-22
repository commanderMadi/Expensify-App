import {addExpense, removeExpense, editExpense} from '../../actions/expenses';

test('should generate the removeExpense action object',()=>{
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should generate the editExpense action object',()=>{
    const action = editExpense('123abc', {note: 'New note val'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {note: 'New note val'}
    })
})

test('should generate the addExpense action object',()=>{
    const expenseData = {
        note: 'Funny note',
        description: 'Funny Expense',
        amount: 100000,
        createdAt: 1000
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {...expenseData, id: expect.any(String),
        }
    })
})

test('should generate the addExpense action object with default values',()=>{
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
})


