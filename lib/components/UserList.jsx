import React from 'react';
import { pick, map, extend, uniq } from 'lodash';

const getUsers = (messages) => {
  return messages.map(m => {
  return (<p className="user-list-user">{m.user.displayName} ({m.user.email})</p>);
})
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
