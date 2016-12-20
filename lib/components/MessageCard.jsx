import React from 'react';
import moment from 'moment';
import Button from './Button';


const MessageCard = ({ message, handleDelete, id, user }) => {

  return (

        <article className="message-card">
        <img className='user-photo' src={message.user.photoURL}/>
        <span className="date-display">{moment(message.createdAt).format('MM/D, h:mm:ss a')}</span>  <span className="display-name">{message.user.displayName}</span>
      <Button
        className='btn btn-delete'
        text= ''
        handleClick={ () => handleDelete(id) }
       />
       <span className="message-content">{message.content}</span>
      </article>


  );
};

export default MessageCard;
