import React from 'react';
import MessageCard from './MessageCard';

const MessageWindow = ({ messages, handleDelete, user }) => {
  return (
    <article>
      <ul>
         {messages.map(m => <MessageCard
           user={user}
           id={m.key}
           message={m}
           handleDelete={handleDelete} />) }
      </ul>
    </article>
  );
};

export default MessageWindow;
