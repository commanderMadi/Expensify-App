import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

test('it should render ExpenseSummary with 1 expense only', () => {
    const wrapper = shallow(<ExpenseSummary totalVisible={1} totalAmount={20}/>);
    expect(wrapper).toMatchSnapshot();
});

test('it should render ExpenseSummary with multiple expenses', () => {
    const wrapper = shallow(<ExpenseSummary totalVisible={5} totalAmount={1000000}/>);
    expect(wrapper).toMatchSnapshot();
});