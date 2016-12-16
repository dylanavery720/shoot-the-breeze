import React from 'react';

export default class CharacterCount extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p>{this.props.count}</p>
      </div>
    );
  }
}
