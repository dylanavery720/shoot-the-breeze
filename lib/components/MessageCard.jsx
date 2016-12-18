import React from 'react';
import moment from 'moment';
import Button from './Button';


const MessageCard = ({ messages, handleClick }) => {

  return (

        <li key={messages.key}> {messages.user.displayName}: {messages.content} {moment(messages.createdAt).format('MM/D, h:mm:ss a')}
      <Button
        className='btn btn-delete'
        text= 'X'
        handleClick= { e => handleClick(e) }
       /></li>


  );
};

export default MessageCard;
