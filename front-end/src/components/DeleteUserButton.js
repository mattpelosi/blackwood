import React from "react";
import * as dashboardService from "../services/dashboard.service";

class DeleteUserButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        _id: null
      }
    };

    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.type === "updateUser") {
      this.setState({ user: nextProps.user.data });
    }
  }

  deleteUser() {
    dashboardService.deleteUser(this.state.user._id).then(() => {
      this.props.deleteUser({ data: this.state.user, type: "deleteUser" });
    });
  }

  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.deleteUser}
          className="btn btn-lg btn-danger btn-block"
          type="button"
        >
          Delete
        </button>
      </React.Fragment>
    );
  }
}

export default DeleteUserButton;
