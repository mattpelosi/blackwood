import React from "react";
import CreateUserForm from "../components/CreateUserForm";

import UserList from "../components/UserList";
import update from "immutability-helper";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.passUserThroughProps = this.passUserThroughProps.bind(this);
  }

  passUserThroughProps(userData) {
    const data = update(this.state.user, { $set: userData });
    this.setState({ user: data });
  }

  render() {
    return (
      <React.Fragment>
        <CreateUserForm
          user={this.state.user}
          resetForm={this.passUserThroughProps}
          newUser={this.passUserThroughProps}
          deleteUser={this.passUserThroughProps}
        />
        {/* <UserList user={this.passUserThroughProps} newUser={this.state.user} /> */}
      </React.Fragment>
    );
  }
}

export default Dashboard;
