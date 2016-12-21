import React from 'react';
import { uniq, forOwn, toPairs, values } from 'lodash';

const getUsers = (messages) => {

  let userList = messages.reduce( (users, m) => {
                   users[m.user.uid] = { name: m.user.displayName, email: m.user.email };
                   return users;
                 },
                 {});

  userList = values(userList);

  return (
    <ul>
      { userList.map( u => <li className="user-list-user"> {u.name} ({u.email}) </li> )}
    </ul>
  )
}

const UserList = ( {messages, text} ) => {
    return (
      <div className='user-list'>
        <h1 className='user-list-header'>{text}</h1>
          {getUsers(messages)}
      </div>
    )
}

export default UserList;
