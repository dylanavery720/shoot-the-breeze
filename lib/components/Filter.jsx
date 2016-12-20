import React from 'react';
import Button from './Button';


export const sortUp = (a, b) => {
  const timeA = a.createdAt;
  const timeB = b.createdAt;
  if (timeA > timeB) { return -1; }
  if (timeA < timeB) { return 1; }
  return 0;
}

export const sortDown = (a, b) => {
  const timeA = a.createdAt;
  const timeB = b.createdAt;
  if (timeA < timeB) { return -1; }
  if (timeA > timeB) { return 1; }
  return 0;
}



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
        <h1 className="title"> {this.props.title} </h1>
      <input
        className={this.props.className}
        placeholder="Filter"
        value={ this.state.query }
        onChange={ e => this.updateFilter(e) }
      />
      <div className="sort-button-container">
      <Button
        className="btn btn-sort"
        text='Sort'
        icon={<span className='icon-arrow-up'></span>}
        handleClick={ this.props.sortUp } />
        <Button
          className="btn btn-sort"
          text='Sort'
          icon={<span className='icon-arrow-down'></span>}
          handleClick={ this.props.sortDown } />
          </div>
      </section>
    );
  }
}
