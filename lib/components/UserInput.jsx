import React from 'react';

export default class UserInput extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <input
        className={this.props.className}
        placeholder="Message…"
        value={ this.props.draftMessage }
        onChange={ this.props.handleChange }
      />
    );
  }
}
