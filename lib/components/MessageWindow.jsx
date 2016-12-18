import React from 'react';
import firebase, { signIn, signOut } from '../firebase';
import MessageCard from './MessageCard';
import Button from './Button'

const MessageWindow = ({ messages, deleteCard }) => {
  return (
    <article>
      <ul>
         {messages.map(m => <MessageCard
           messages={m}
           handleClick={ (e) => { deleteCard(e); } } />) };
      </ul>
      <div>
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
      </div>
    </article>
  );
};

export default MessageWindow;
