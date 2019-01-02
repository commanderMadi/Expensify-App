import React from 'react';
import { shallow } from 'enzyme';
import { WelcomeMessage } from '../../components/WelcomeMessage';
import { altFilters } from '../fixtures/filters';

const user = {
    displayName: 'Test user'
};

let wrapper;
beforeEach(() => {
    wrapper = shallow(<WelcomeMessage userName={user} filters={altFilters}/>);
});

test('Should render the welcome message correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should dismiss default message', () => {
    wrapper.find('#close-msg').simulate('click', ()=>{});
    expect(wrapper.state('msgDismissed')).toBe(true);
    expect(wrapper).toMatchSnapshot();
});