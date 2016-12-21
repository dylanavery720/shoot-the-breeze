import React from 'react';
import MessageCard from './MessageCard';

const MessageWindow = ({ messages, handleDelete, user }) => {
  return (
    <section className="message-window" >
     {messages.map(m => <MessageCard
       key={m.key}
       user={user}
       id={m.key}
       message={m}
       handleDelete={handleDelete} />) }
    </section>
  );
};

export default MessageWindow;
