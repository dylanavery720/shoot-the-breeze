import React from 'react';
import { values } from 'lodash';
import User from './User';

const getUsers = (messages, currentUser) => {

  let userList = messages.reduce( (users, m) => {
                   users[m.user.uid] = { name: m.user.displayName, email: m.user.email, uid: m.user.uid };
                   return users;
                 },
                 {});

  userList = values(userList);

  return (
    <ul>
      { userList.map( data => <User className="user-list-user" userData={data} currentUser={currentUser}/> )}

    </ul>
  )
}

const UserList = ( {messages, text, currentUser} ) => {
    return (
      <div className='user-list'>
        <h1 className='user-list-header'>{text}</h1>
          {getUsers(messages, currentUser)}
      </div>
    )
}

export default UserList;
