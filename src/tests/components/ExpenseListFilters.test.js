import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import moment from 'moment';
import { filters, altFilters } from '../fixtures/filters';


let setTextFilter, setStartDate, setEndDate, sortByDate, sortByAmount, wrapper;
beforeEach( () => {
    setTextFilter = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    wrapper = shallow (
        <ExpenseListFilters
        filters = {filters}
        setTextFilter = {setTextFilter}
        setStartDate = {setStartDate}
        setEndDate = {setEndDate}
        sortByDate = {sortByDate}
        sortByAmount = {sortByAmount}
         />)
})

test('should render ExpenseListFilters component correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters component with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = "filtered text";
    wrapper.find('input').first().simulate('change', {
        target: {value}
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
});

test('should handle sort by Amount', () => {
    const value = "amount"
    wrapper.find('select').simulate('change', {
        target: {value}
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle sort by Date', () => {
    const value = "date"
    wrapper.find('select').simulate('change', {
        target: {value}
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate})
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});


test('should handle date focus changes', () => {
    const calendarFocused = 'startDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});