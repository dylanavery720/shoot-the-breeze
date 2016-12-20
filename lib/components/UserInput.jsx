import React from 'react';
import CharacterCount from  './CharacterCount';
import Button from './Button';
import Auth from './Auth';

export default class UserInput extends React.Component {
  render() {
    return (
      <div className="footer">
        {/* <div className="auth-user"> */}
          <Auth handleSignIn={this.props.handleSignIn} user={this.props.user}/>
        {/* </div> */}
        <div>
          <input
            className={this.props.className}
            placeholder="Message…"
            value={ this.props.draftMessage }
            onChange={ this.props.handleChange }
            />
            <CharacterCount count={140 - this.props.count} />
        <div className="sort-button-container">
        <Button
          className="btn btn-submit"
          text='Submit'
          handleClick={this.props.submit}
          disabled={this.props.count > 140 || this.props.count === 0}
        />
        <Button
          className="btn btn-clear"
          text='Clear'
          handleClick={this.props.clear}
          disabled={this.props.count === 0} />
          </div>
        </div>
      </div>
    );
  }
}
