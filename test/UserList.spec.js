import React from 'react';

import Sinon from 'sinon';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';

import { fakeMessages } from './helpers/stubData'

// import Application from '../lib/components/Application';
// import Filter from '../lib/components/Filter';
import UserList from '../lib/components/UserList';

require('locus');

describe('<UserList />', () => {




  it.skip('renders as a <div>', () => {
    const wrapper = shallow(<UserList messages={fakeMessages}/>)
    assert.equal(wrapper.type(), 'div');
  });

  it('renders the title from prop', () => {

    const wrapper = shallow(<UserList text="Users" messages={fakeMessages}/>);

    const heading = wrapper.find('.user-list-header');
    console.log(fakeMessages);
    // eval(locus);
    expect(heading.text()).to.contain('Users');


  });

  it.skip('renders Users from message list', () => {

    const wrapper = shallow(<UserList text="Users" messages={fakeMessages}/>);

    const heading = wrapper.find('.user-list-header');
    // assert.equal(wrapper.props().includedProp, 'text');

    expect(heading.text()).to.contain('Users');


  });


});
