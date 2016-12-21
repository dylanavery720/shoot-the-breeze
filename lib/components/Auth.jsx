import React from 'react';
import Button from './Button';
import firebase, { signIn, signOut } from '../firebase';

const Auth = ({ user, handleSignIn }) => {
  if (!user) {
    return (
      <div className="auth-user">
      <Button
        className="btn btn-log-in"
        text='Log In'
        handleClick={ () => handleSignIn() }
      />
      </div>
    )
  }
  return (
      <div className="auth-user">
        <p className="hello"> {user ? `Logged in as ${user.displayName} (${user.email})` : 'Please Log In' } </p>
        <div>
        <Button
          className="btn btn-log-out"
          text='Log Out'
          handleClick={ () => signOut() }
        />
        </div>
      </div>
    )
}

export default Auth;
