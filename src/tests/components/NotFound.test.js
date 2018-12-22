import React from 'react';
import { shallow } from 'enzyme';
import  NotFound from '../../components/NotFound';

test('should render the Not found 404 page component', () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper).toMatchSnapshot();
});