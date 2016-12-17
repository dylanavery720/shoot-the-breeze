import React, { Component } from 'react'
import { render } from 'react-dom';
import firebase, { reference, signIn, signOut } from '../firebase';
import { pick, map, extend } from 'lodash';
import Button from './Button';
import UserInput from './UserInput';
import Filter from './Filter';
import MessageWindow from './MessageWindow';
import moment from 'moment';
import CharacterCount from './CharacterCount';

// Very few things in this component are a good idea.
// Feel free to blow it all away.

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      draftMessage: '',
      user: null,
      count: 0,
    }

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
        messages: map(messages, (val, key) => extend(val, { key }))
      });
    });

    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  clearMessageDraft() {
    this.setState( { draftMessage: '', count: 0 });
  }

  addNewMessage() {
    const { user, draftMessage } = this.state;
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: draftMessage,
      createdAt: Date.now()
    });

    this.setState( { draftMessage: '', count: 0 });
  }

  updateState(e) {
    this.setState( {
      draftMessage: e.target.value,
      count: e.target.value.length
    });
  }


  sortMessages(sortDirection) {
    const sortCheck = sortDirection ? this.sortUp : this.sortDown;
    const presorted = this.state.messages
    const sorted =  presorted.sort(sortCheck)
    this.setState({ messages: sorted })
  }

  sortUp(a, b) {
    let timeA = a.createdAt;
    let timeB = b.createdAt;
    if( timeA > timeB) { return -1}
    if( timeA < timeB) { return 1}
    return 0
  }

  sortDown(a, b) {
    let timeA = a.createdAt;
    let timeB = b.createdAt;
    if( timeA < timeB) { return -1}
    if( timeA > timeB) { return 1}
    return 0
  }

  filterMessages(q) {
    if (q !== '') {
      const r = new RegExp(q, 'i');
      const messages = this.state.messages;


      this.setState({messages:  messages.filter( message =>
        message.content.search(r) !== -1 )});
    } else {
      reference.limitToLast(100).on('value', (snapshot) => {
        const messages = snapshot.val() || {};
        this.setState({
          messages: map(messages, (val, key) => extend(val, { key }))
        });
      });
    }
  }

  handleDelete(e) {
    let cardToDelete = this.state.messages.find( msg => msg.key === e.target.key)
    console.log(cardToDelete);
  }



  render() {
    const { user, messages, draftMessage } = this.state;

    return (
      <div className="Application">
        <section className="header">
        <Filter
          className="input filter"
          handleChange={(q) => this.filterMessages(q)}
         />
       <div className="sort-button-container">
        <Button
          className="btn btn-sort"
          text="Up"
          handleClick={ () => {this.sortMessages(true) }} />
          <Button
            className="btn btn-sort"
            text="Down"
            handleClick={ () => {this.sortMessages(false) }} />
        </div>
        </section>
        <article>
        <MessageWindow
          className="message-window"
          messages={ this.state.messages }
          deleteCard={this.handleDelete.bind(this)} />
        </article>
        <Button
        className="btn btn-log-in"
        text='Log In'
        handleClick={ () => signIn() }
        />
        <Button
        className="btn btn-log-out"
        text='Log Out'
        handleClick={ () => signOut() }
        />
        <div className="footer">
          <UserInput
            className='input message-field'
            handleChange={ this.updateState }
            draftMessage={ this.state.draftMessage }
          />
        <CharacterCount count={140 - this.state.count}/>
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
            disabled={this.state.count === 0}
          />
        </div>
      </div>
    )
  }
}

// {user ? <p>Hello {user.displayName}</p> : <button onClick={() => signIn()}>Sign In</button> }

render(<Application/>, document.getElementById('application'));
