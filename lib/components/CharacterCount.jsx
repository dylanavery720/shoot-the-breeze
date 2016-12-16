import React from 'react';

export default class CharacterCount extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p className='c-count'>{this.props.count}</p>
      </div>
    );
  }
}
