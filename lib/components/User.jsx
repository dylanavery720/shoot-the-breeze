import React from 'react';

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
    }
  }

  componentDidMount() {
    if (this.props.userData.uid === this.props.currentUser.uid) {
      this.setState({ active: true });
    }
  }

  render() {
    const userName = this.props.userData.name;
    const userEmail = this.props.userData.email;
    return (
      <li className="user-list-user">
        {userName.split(' ').shift()} ({userEmail})
        { this.state.active ? <span className="user-list-active fa fa-circle"></span> : undefined }
      </li>

    )
  }
}
