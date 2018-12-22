import {setTextFilter, setStartDate, setEndDate, sortByAmount, sortByDate} from '../../actions/filters';
import moment from 'moment';

test('should generate setStartDate action object', ()=>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        date: moment(0)
    });
});

test('should generate setEndDate action object', ()=>{
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        date: moment(0)
    });
});

test('should generate sortByAmount action object', ()=>{
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('should generate sortByDate action object', ()=>{
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('should generate setTextFilter action object', ()=>{
    const action = setTextFilter('text filter applied');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'text filter applied'
    });
});

test('should generate setTextFilter action object using default vals', ()=>{
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});