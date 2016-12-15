import React from 'react';

const MessageWindow = ( { messages } ) => {

  return (
    <ul>
      { messages.map(m => <li key={m.key}> {m.user.displayName}: {m.content} {m.createdAt}</li>) }
    </ul>
  );

}

export default MessageWindow;
