import React from 'react';
import { values } from 'lodash';
import User from './User';

const getUsers = (messages, currentUser, filterUsers) => {
  let userList = messages.reduce((users, m) => {
    users[m.user.uid] = {
      name: m.user.displayName,
      email: m.user.email,
      uid: m.user.uid };
    return users;
  },
                 {});

  userList = values(userList);

  return (
    <ul>
      { userList.map(data => <User key={data.uid}
                                    className="user-list-user"
                                    userData={data}
                                    currentUser={currentUser}
                                    handleClick={filterUsers}/>)}
    </ul>
  )
}

const UserList = ({ messages, text, currentUser, filterUsers }) => {
  return (
      <div className='user-list'>
        <h1 className='user-list-header'>{text}</h1>
          {getUsers(messages, currentUser, filterUsers)}
      </div>
  )
}

export default UserList;
