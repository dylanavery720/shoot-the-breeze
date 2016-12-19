import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import Application from '../lib/components/Application';
import UserInput from '../lib/components/UserInput';


describe('Application', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div');
  });

  it.skip('show should allow a user to add a new message to chat', () => {
    const wrapper = mount(<UserInput className='message-field' />);
    const input = wrapper.find('.message-field');
    const submit = wrapper.find('.btn-submit');
    input.simulate('change', input.node.value = 'hello, world');
    submit.simulate('click');
    assert.equal(wrapper.props().includedProp, 'hello, world');
  });

});
