import {
    startAddExpense,
    addExpense,
    removeExpense,
    editExpense,
    startSetExpenses,
    setExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase'

const middleWare = [thunk];
const mockStore = configureStore(middleWare);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(expense => {
        const {id, description, note, amount, createdAt} = expense;
        expenseData[id] = {description, note, amount, createdAt}
    });
    database.ref().set(expenseData).then(() => done());
})

test('should generate the removeExpense action object', () => {
    const action = removeExpense({
        id: '123abc'
    });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should generate the editExpense action object', () => {
    const action = editExpense('123abc', {
        note: 'New note val'
    });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note val'
        }
    });
});

test('should generate the addExpense action object', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = mockStore({});

    const expenseDummyData = {
        description: 'Headphones',
        amount: 9000,
        note: 'Hyperx cloud II',
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expenseDummyData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDummyData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        const value = snapshot.val();
        expect(value).toEqual(expenseDummyData);
        done();
    })
});

test('should add expense with default values to database and store', (done) => {
    const store = mockStore({});

    const defaultData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        const value = snapshot.val();
        expect(value).toEqual(defaultData);
        done();
    })
});

test('should set expenses', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from database', (done) => {
    const store = mockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
    });
    done();
});