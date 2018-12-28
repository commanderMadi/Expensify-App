import { shallow } from 'enzyme';
import React from 'react';
import { LoginPage } from '../../components/LoginPage';

let wrapper, startLogin;

beforeEach(() => {
  startLogin = jest.fn();
  wrapper = shallow(<LoginPage startLogin={startLogin} />);

});

test('should render Login page correctly', () => {
  expect(wrapper).toMatchSnapshot();  
});

test('should fire the login callback successfully', () => {
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});