import React from 'react';
import getUsers from '../helpers/getUsers'

const UserList = ({ messages, text, currentUser, filterUsers }) => {
  return (
      <div className='user-list'>
        <h1 className='user-list-header'>{text}</h1>
          {getUsers(messages, currentUser, filterUsers)}
      </div>
  )
}

export default UserList;
