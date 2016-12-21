import React from 'react';
import moment from 'moment';
import Button from './Button';


const MessageCard = ({ message, handleDelete, id, user }) => {
  return (
    <article className="message-card">

    <span className="date-display">{moment(message.createdAt).format('MM/D, h:mm:ss a')}</span>
    <span className="display-name">{message.user.displayName}</span>
    <Button
      className='btn btn-delete'
      text= ''
      handleClick={ () => handleDelete(id) }
    />
    <div className ="talk-box">
      <img className='user-photo' src={message.user.photoURL}/>
      <span className="message-content">{message.content}</span>
    </div>
    </article>


  );
};

export default MessageCard;
