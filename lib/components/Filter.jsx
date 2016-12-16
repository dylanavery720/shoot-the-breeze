import React from 'react';

export default class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
    }
  }

  updateFilter(e) {
    this.setState( { query: e.target.value },
      this.props.handleChange(e.target.value));
  }


  render() {
    return (
      <input
        className={this.props.className}
        placeholder="Filter"
        value={ this.state.query }
        onChange={ (e) => this.updateFilter(e) }
      />
    );
  }
}
