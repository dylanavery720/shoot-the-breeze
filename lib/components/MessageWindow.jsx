import React from 'react';
import moment from 'moment';

const MessageWindow = ( { messages } ) => {

  return (
    <ul>
      { messages.map(m => <li key={m.key}> {m.user.displayName}: {m.content} {moment(m.createdAt).format("MM/D, h:mm:ss a")}</li>) }
    </ul>
  );

}

export default MessageWindow;
