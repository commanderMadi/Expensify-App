import React from 'react';
import { shallow } from 'enzyme';
import  DashBoard from '../../components/DashBoard';

test('should render the dashboard page component', () => {
    const wrapper = shallow(<DashBoard />);

    expect(wrapper).toMatchSnapshot();
});