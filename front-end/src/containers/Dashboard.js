import React from "react";
import CreateUserForm from "../components/CreateUserForm";
import UserList from "../components/UserList";

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.passUserThroughProps = this.passUserThroughProps.bind(this);
  }

  passUserThroughProps(userData) {
    this.setState({ user: userData });
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
        <UserList user={this.passUserThroughProps} newUser={this.state.user} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
