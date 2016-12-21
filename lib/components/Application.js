import React, { Component } from 'react';
import { render } from 'react-dom';
import { pick, map, extend } from 'lodash';
import firebase, { reference, signIn, signOut } from '../firebase';
import UserInput from './UserInput';
import Filter, {sortUp, sortDown } from './Filter';
import MessageWindow from './MessageWindow';
import UserList from './UserList'

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: null,
    };

    this.sortMessages = this.sortMessages.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
    this.getMessages();
  }

  getMessages() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key })),
      });
    });
  }

  sortMessages(sortDirection) {
    const sortCheck = sortDirection ? sortUp : sortDown;
    const presorted = this.state.messages;
    const sorted = presorted.sort(sortCheck);
    this.setState({ messages: sorted });
  }

  filterMessages(q) {
    if (q !== '') {
      const r = new RegExp(q, 'i');
      const messages = this.state.messages;

      this.setState({ messages: messages.filter(message =>
        message.content.search(r) !== -1) });
    } else {
      this.getMessages();
    }
  }

  handleSignIn() {
    signIn().then(() => this.getMessages());
  }

  handleDelete(targetId) {
    const messageToDelete = this.state.messages.find(msg => msg.key === targetId)

    if (this.state.user.uid === messageToDelete.user.uid) {
      firebase.database().ref('messages').child(messageToDelete.key).remove();
    }
  }

  render() {
    return (
      <div className="Application">
        <Filter
          title={this.props.title}
          className="input filter"
          handleChange={q => this.filterMessages(q) }
          sortUp = { () => { this.sortMessages(true); }}
          sortDown = { () => { this.sortMessages(false); } } />
        <UserList messages={this.state.messages} text="Users" />
        <MessageWindow
          className="message-window"
          messages={ this.state.messages }
          handleDelete={this.handleDelete}
          user={this.state.user} />
        <UserInput
            className='input message-field'
            user={this.state.user}
            handleSignIn={this.handleSignIn} />
      </div>
    );
  }
}

render(<Application title="Shoot The Breeze" />, document.getElementById('application'));
