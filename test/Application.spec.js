import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';

import Application from '../lib/components/Application';
import Filter from '../lib/components/Filter';
import UserInput from '../lib/components/UserInput';
import UserList from '../lib/components/UserList';
import MessageWindow from '../lib/components/MessageWindow';


describe('<Application />', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div');
  });

  it('renders a <Filter />', () => {
    const wrapper = shallow(<Application />);
    expect(wrapper.find(Filter)).to.have.length(1);
  });

  it('should render a <MessageWindow />', () => {
    const wrapper = shallow(<Application />);
    expect(wrapper.find(MessageWindow)).to.have.length(1);
  });

  it('should render a <UserList />', () => {
    const wrapper = shallow(<Application />);
    expect(wrapper.find(UserList)).to.have.length(1);
  });

  it('should render a <UserInput />', () => {
    const wrapper = shallow(<Application />);
    expect(wrapper.find(UserInput)).to.have.length(1);
  });
});
