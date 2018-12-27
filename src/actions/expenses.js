import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE Action

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});


export const startAddExpense = (expenseData) => {
    return (dispatch) => {
        const {
            description = '', note = '', amount = 0, createdAt = 0
        } = expenseData
        const expense = {
            description,
            note,
            amount,
            createdAt
        };
        return database.ref('expenses').push(expense)
            .then(ref => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }));
            })
    }
}


//REMOVE_EXPENSE Action

export const removeExpense = ({
    id
} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE Action
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return dispatch => {
        return database.ref('expenses').once('value').then((snapshot) => {
            const arr = [];
            snapshot.forEach(childSnapshot => {
                arr.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            console.log(arr);
            dispatch(setExpenses(arr));
        })
    }
}