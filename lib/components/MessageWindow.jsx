import React from 'react';
import moment from 'moment';
import Button from './Button'

const MessageWindow = ( { messages, deleteCard } ) => {

  return (
    <ul>
      { messages.map(m => <li key={m.key}> {m.user.displayName}: {m.content} {moment(m.createdAt).format("MM/D, h:mm:ss a")}
      <Button
        className='btn btn-delete'
        text= 'delete'
        handleClick= { (e) => {deleteCard(e)}}
      /></li>) }
    </ul>
  );

}

export default MessageWindow;
