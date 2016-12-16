import React from 'react';
import moment from 'moment';
import Button from './Button'

const MessageWindow = ( { messages } ) => {

  return (
    <ul>
      { messages.map(m => <li key={m.key}> {m.user.displayName}: {m.content} {moment(m.createdAt).format("MM/D, h:mm:ss a")}
      <Button
        className='btn btn-delete'
        handleClick= {(e) => {
          parent = e.target.parentNode;
          parent.remove();
        }}
      /></li>) }
    </ul>
  );

}

export default MessageWindow;
