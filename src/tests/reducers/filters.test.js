import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should init the reducer with default values', () => {
    const state = filtersReducer(undefined, {
        type: '@@INIT'
    });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should dispatch the SORT_BY_AMOUNT action', () => {
    const state = filtersReducer(undefined, {
        type: 'SORT_BY_AMOUNT'
    });
    expect(state.sortBy).toBe('amount');
})

test('should dispatch the SORT_BY_AMOUNT action', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const state = filtersReducer(currentState, {
        type: 'SORT_BY_DATE'
    })
    expect(state.sortBy).toBe('date');
});

test('should dispatch the SET_TEXT_FILTER action', () => {
    const currentState = {
        text: 'empty',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const state = filtersReducer(currentState, {
        type: 'SET_TEXT_FILTER',
        text: 'some text'
    });
    expect(state).toEqual({
        ...currentState,
        text: 'some text'
    })
});

test('should dispatch the SET_START_DATE action', () => {
    const startDate = moment();
    const state = filtersReducer(undefined, {type: 'SET_START_DATE', date: startDate});
    expect(state.startDate).toEqual(startDate)
});

test('should dispatch the SET_END_DATE action', () => {
    const endDate = moment();
    const state = filtersReducer(undefined, {type: 'SET_END_DATE', date: endDate});
    expect(state.endDate).toEqual(endDate)
});