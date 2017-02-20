import { values } from 'lodash';
import React from 'react';
import User from '../components/User';

export default (messages, currentUser, filterUsers) => {
  let userList = messages.reduce((users, m) => {
    users[m.user.uid] = {
      name: m.user.displayName,
      email: m.user.email,
      uid: m.user.uid };
    return users;
  }, {});

  userList = values(userList);

  return (
    <ul>
      {userList.map(data =>
        <User key={data.uid}
              className="user-list-user"
              userData={data}
              currentUser={currentUser}
              handleClick={filterUsers}/>)}
    </ul>
  )
}
