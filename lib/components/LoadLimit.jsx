import React from 'react'
import { reference } from '../firebase';

export default const LoadLimit = ({ updateState }) => {
  reference.limitToLast(100).on('value', (snapshot) => {
    const messages = snapshot.val() || {};
    this.setState({
      messages: map(messages, (val, key) => extend(val, { key }))
    });
  });
}
