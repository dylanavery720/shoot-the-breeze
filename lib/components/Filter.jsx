import React from 'react';
import Button from './Button';


export default class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
    };
  }

  updateFilter(e) {
    this.setState({ query: e.target.value },
      this.props.handleChange(e.target.value));
  }


  render() {
    return (
      <section className="header">
      <input
        className={this.props.className}
        placeholder="Filter"
        value={ this.state.query }
        onChange={ e => this.updateFilter(e) }
      />
      <div className="sort-button-container">
      <Button
        className="btn btn-sort"
        text="Up"
        handleClick={ this.props.sortUp } />
        <Button
          className="btn btn-sort"
          text="Down"
          handleClick={ this.props.sortDown } />
          </div>
      </section>
    );
  }
}
