import React from 'react';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';

import Filter from '../lib/components/Filter';

describe('<Filter />', () => {
  it('renders as a <section>', () => {
    const wrapper = shallow(<Filter />)
    assert.equal(wrapper.type(), 'section')
  });

  it('should have a state of query', () => {
    const wrapper = mount(<Filter className='filter' handleChange={ () => {} } />)
    const filter = wrapper.find('.filter')
    filter.simulate('change', filter.node.value = 'search')
    expect(wrapper.state().query).to.equal('search')
  });

  it('calls updateFilter on handleChange', () => {
    const updateFilter = sinon.spy();
    const wrapper = mount(
      <Filter className='filter'
      handleChange={ updateFilter } />
    );
    const filter = wrapper.find('.filter')
    filter.simulate('change', filter.node.value = 's')
    expect(updateFilter).to.have.property('callCount', 1)
  });
});
