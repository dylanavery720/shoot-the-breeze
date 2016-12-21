import React from 'react';
import Sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import { fakeMessages } from './helpers/stubData'
import UserList from '../lib/components/UserList';

require('locus');

describe('<UserList />', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<UserList messages={fakeMessages}/>)
    assert.equal(wrapper.type(), 'div');
  });

  it('renders the title from prop', () => {
    const wrapper = shallow(<UserList text="Users" messages={fakeMessages}/>);

    const heading = wrapper.find('.user-list-header');
    expect(heading.text()).to.contain('Users');
  });

  it('renders Users from message list', () => {
    const wrapper = render(<UserList text="Users"
     messages={fakeMessages}/>);
    const users = wrapper.find('.user-list-user');
    expect(users).to.have.length(2);
  });
});
