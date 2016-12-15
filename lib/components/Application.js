import React, { Component } from 'react'
import { render } from 'react-dom';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import Button from './Button';
import UserInput from './UserInput';
import MessageWindow from './MessageWindow';
import moment from 'moment'

// Very few things in this component are a good idea.
// Feel free to blow it all away.

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      draftMessage: '',
      user: null
    }

    this.addNewMessage = this.addNewMessage.bind(this);
    this.updateState = this.updateState.bind(this);
    this.clearMessageDraft = this.clearMessageDraft.bind(this);
  }

  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key }))
      });
    });

    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  clearMessageDraft() {
    this.setState( { draftMessage: '' });
  }

  addNewMessage() {
    const { user, draftMessage } = this.state;
    let momento = moment().toString()
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: draftMessage,
      createdAt: momento
    });

    this.setState({ draftMessage: '' });
  }

  updateState(e) {
    this.setState( { draftMessage: e.target.value });
  }

  render() {
    const { user, messages, draftMessage } = this.state;

    return (
      <div className="Application">
        <MessageWindow messages={ this.state.messages } />
        <div className="MessageInput">
          <Button
            text='Log In'
            handleClick={ () => signIn() }
          />
          <UserInput
            handleChange={ this.updateState }
            draftMessage={ this.state.draftMessage }
          />
          <Button
            text='Submit'
            handleClick={this.addNewMessage}
          />
          <Button
            text='Clear'
            handleClick={this.clearMessageDraft}
          />
        </div>
      </div>
    )
  }
}

// {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }

render(<Application/>, document.getElementById('application'));
