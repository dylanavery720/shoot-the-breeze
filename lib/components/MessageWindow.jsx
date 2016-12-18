import React from 'react';
import MessageCard from './MessageCard';

const MessageWindow = ({ messages, deleteCard }) => {
  return (
    <article>
      <ul>
         {messages.map(m => <MessageCard
           messages={m}
           handleClick={ (e) => { deleteCard(e) } } />) }
      </ul>
    </article>
  );
};

export default MessageWindow;
