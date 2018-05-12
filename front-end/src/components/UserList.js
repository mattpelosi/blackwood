import React from "react";
import * as dashboardService from "../services/dashboard.service";
import update from "immutability-helper";

class UserList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.mapUsers = this.mapUsers.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  componentDidMount() {
    dashboardService
      .readAll()
      .then(users => {
        this.setState({ users: users });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newUser.type === "addUser") {
      const updatedUsers = update(this.state.users, {
        $push: [nextProps.newUser.data]
      });
      this.setState({ users: updatedUsers });
    }
    if (nextProps.newUser.type === "deleteUser") {
      const updatedUsers = this.state.users.filter(user => {
        return user._id != nextProps.newUser.data._id;
      });
      this.setState({ users: updatedUsers });
    }
  }

  editUser(user) {
    user.edit = true;
    this.props.user({ data: user, type: "updateUser" });
  }

  mapUsers() {
    return this.state.users.map(user => {
      return (
        <ul className="list-group form-signin">
          <li className="list-group-item">{user.email}</li>
          <li className="list-group-item">{user.userName}</li>
          <button
            className="btn btn-primary"
            onClick={this.editUser.bind(this, user)}
          >
            Edit
          </button>
        </ul>
      );
    });
  }

  render() {
    const users = this.mapUsers();
    return (
      <React.Fragment>
        <div>{users}</div>
      </React.Fragment>
    );
  }
}

export default UserList;
