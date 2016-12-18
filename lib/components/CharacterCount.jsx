import React from 'react';

export default class CharacterCount extends React.Component {

  render() {
    return (
        <p className='c-count'>{this.props.count}</p>
    );
  }
}
