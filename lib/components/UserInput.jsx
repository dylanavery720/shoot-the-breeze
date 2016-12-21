import React from 'react';
import { pick, map, extend } from 'lodash';
import CharacterCount from './CharacterCount';
import Button from './Button';
import Auth from './Auth';
import firebase, { reference } from '../firebase';

export default class UserInput extends React.Component {

  constructor() {
    super()
    this.state = {
      draftMessage: '',
      count: 0,
      check: false,
    }
    this.addNewMessage = this.addNewMessage.bind(this);
    this.updateState = this.updateState.bind(this);
    this.clearMessageDraft = this.clearMessageDraft.bind(this);
  }

  clearMessageDraft() {
    this.setState({ draftMessage: '', count: 0 });
  }

  addNewMessage() {
    const { draftMessage } = this.state;
    reference.push({
      user: pick(this.props.user, 'displayName', 'email', 'uid', 'photoURL'),
      content: draftMessage,
      createdAt: Date.now(),
    });

    this.setState({ draftMessage: '', count: 0 });
  }

  updateState(e) {
    this.countCheck();
    if (this.state.check) {
      // e.preventDefault();
    } else {
      this.setState({
        draftMessage: e.target.value,
        count: e.target.value.length,
      });
    }
  }

  countCheck() {
    this.state.count >= 140 ? this.state.check = true : this.state.check = false;
  }

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
            value={ this.state.draftMessage }
            onChange={ this.updateState }
            />
            <CharacterCount count={140 - this.state.count} />
        <div className="sort-button-container">
        <Button
          className="btn btn-submit"
          text='Submit'
          handleClick={this.addNewMessage}
          disabled={this.state.count > 140 || this.state.count === 0}
        />
        <Button
          className="btn btn-clear"
          text='Clear'
          handleClick={this.clearMessageDraft}
          disabled={this.state.count === 0} />
          </div>
        </div>
      </div>
    );
  }
}
