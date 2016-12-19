import React from 'react';
import moment from 'moment';
import Button from './Button';


const MessageCard = ({ message, handleDelete, id, user }) => {

  return (

        <li> {message.user.displayName}: {message.content} {moment(message.createdAt).format('MM/D, h:mm:ss a')}
      <Button
        className='btn btn-delete'
        text= 'X'
        handleClick={ () => handleDelete(id) }
       />

      </li>


  );
};

export default MessageCard;
