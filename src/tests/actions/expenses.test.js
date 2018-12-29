import {
    startAddExpense,
    addExpense,
    startRemoveExpense,
    removeExpense,
    startEditExpense,
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

// fake id and auth state for test purposes
const fake_uid = 'xxyyzz123456';
const defAuthState = {auth: {uid: fake_uid}};

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expenseData[id] = {description, note, amount, createdAt}
    });
    database.ref(`users/${fake_uid}/expenses`).set(expenseData).then(() => done());
});

test('should remove expenses data from database', (done) => {
    const store = mockStore(defAuthState);
    const id = expenses[2].id
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${fake_uid}/expenses/${id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
    });
});

test('should generate the removeExpense action object', () => {
    const action = removeExpense({
        id: '123abc'
    });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should edit expenses data within database', (done) => {
    const store = mockStore(defAuthState);
    const id = expenses[2].id
    const updates = {description: 'Something different and badass like me!'}

    store.dispatch(startEditExpense(id,updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${fake_uid}/expenses/${id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val().description).toBe(updates.description);
            done();
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
    const store = mockStore(defAuthState);

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
        return database.ref(`users/${fake_uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        const value = snapshot.val();
        expect(value).toEqual(expenseDummyData);
        done();
    })
});

test('should add expense with default values to database and store', (done) => {
    const store = mockStore(defAuthState);

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
        return database.ref(`users/${fake_uid}/expenses/${actions[0].expense.id}`).once('value');
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
    const store = mockStore(defAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});