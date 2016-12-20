import React, { Component } from 'react';
import moment from 'moment';
import { render } from 'react-dom';
import { pick, map, extend } from 'lodash';
import firebase, { reference, signIn, signOut } from '../firebase';
import UserInput from './UserInput';
import Filter from './Filter';
import MessageWindow from './MessageWindow';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      draftMessage: '',
      user: null,
      count: 0,
      users: [],
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.updateState = this.updateState.bind(this);
    this.clearMessageDraft = this.clearMessageDraft.bind(this);
    this.sortMessages = this.sortMessages.bind(this);
    this.sortUp = this.sortUp.bind(this);
    this.sortDown = this.sortDown.bind(this);
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

  clearMessageDraft() {
    this.setState({ draftMessage: '', count: 0 });
  }

  addNewMessage() {
    const { user, draftMessage } = this.state;
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid', 'photoURL'),
      content: draftMessage,
      createdAt: Date.now(),
    });

    this.setState({ draftMessage: '', count: 0 });
  }

  sortMessages(sortDirection) {
    const sortCheck = sortDirection ? this.sortUp : this.sortDown;
    const presorted = this.state.messages;
    const sorted = presorted.sort(sortCheck);
    this.setState({ messages: sorted });
  }

  sortUp(a, b) {
    const timeA = a.createdAt;
    const timeB = b.createdAt;
    if (timeA > timeB) { return -1; }
    if (timeA < timeB) { return 1; }
    return 0;
  }

  sortDown(a, b) {
    const timeA = a.createdAt;
    const timeB = b.createdAt;
    if (timeA < timeB) { return -1; }
    if (timeA > timeB) { return 1; }
    return 0;
  }


  updateState(e) {
    this.setState({
      draftMessage: e.target.value,
      count: e.target.value.length,
    });
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
    signIn().then( () => this.getMessages());
  }

  handleDelete(targetId) {
    let messageToDelete = this.state.messages.find( msg => msg.key === targetId )

    if (this.state.user.uid === messageToDelete.user.uid) {
      firebase.database().ref('messages').child(messageToDelete.key).remove();
    }
  }

  render() {
    return (
      <div className="Application">
        <Filter
          className="input filter"
          handleChange={q => this.filterMessages(q) }
          sortUp = { () => { this.sortMessages(true); }}
          sortDown = { () => { this.sortMessages(false); } } />
        <MessageWindow
          className="message-window"
          messages={ this.state.messages }
          handleDelete={this.handleDelete}
          user={this.state.user} />

        <UserInput
            className='input message-field'
            handleChange={ this.updateState }
            draftMessage={ this.state.draftMessage }
            count= { this.state.count }
            clear = {this.clearMessageDraft}
            submit = {this.addNewMessage}
            user={this.state.user}
            handleSignIn={this.handleSignIn} />
      </div>
    );
  }
}

render(<Application/>, document.getElementById('application'));
