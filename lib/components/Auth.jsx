import React from 'react';
import Button from './Button';
import firebase, { signIn, signOut } from '../firebase';

const Auth = ({ user, handleSignIn }) => {

  if(!user) {
    return (
      <Button
        className="btn btn-log-in"
        text='Log In'
        handleClick={ () => handleSignIn() }
      />
    )
  }
    return (
      <div>
        <p className="hello"> {user ? `Logged in as ${user.displayName} (${user.email})` : 'Please Log In' } </p>
        <Button
          className="btn btn-log-out"
          text='Log Out'
          handleClick={ () => signOut() }
        />
      </div>
    )
}

export default Auth;
