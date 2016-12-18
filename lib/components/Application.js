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
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.updateState = this.updateState.bind(this);
    this.clearMessageDraft = this.clearMessageDraft.bind(this);
    this.sortMessages = this.sortMessages.bind(this);
    this.sortUp = this.sortUp.bind(this);
    this.sortDown = this.sortDown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.filterMessages = this.filterMessages.bind(this);
  }

  componentDidMount() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot.val() || {};
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key })),
      });
    });

    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  clearMessageDraft() {
    this.setState({ draftMessage: '', count: 0 });
  }

  addNewMessage() {
    const { user, draftMessage } = this.state;
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
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
      reference.limitToLast(100).on('value', (snapshot) => {
        const messages = snapshot.val() || {};
        this.setState({
          messages: map(messages, (val, key) => extend(val, { key })),
        });
      });
    }
  }

  handleDelete(e) {

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
          deleteCard={this.handleDelete.bind(this)} />
        <UserInput
            className='input message-field'
            handleChange={ this.updateState }
            draftMessage={ this.state.draftMessage }
            count= { this.state.count }
            clear = {this.clearMessageDraft}
            submit = {this.addNewMessage} />
      </div>
    );
  }
}

// {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }

render(<Application/>, document.getElementById('application'));
