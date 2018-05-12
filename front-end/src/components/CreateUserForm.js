import React from "react";
import * as dashboardService from "../services/dashboard.service";
import DeleteUserButton from "./DeleteUserButton";
import update from "immutability-helper";

class CreateUserForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {}
    };

    this.onChange = this.onChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.user != "undefined" &&
      nextProps.user._id &&
      nextProps.user._id.length > 0
    ) {
      this.setState(prevState => {
        return {
          ...prevState,
          userForm: nextProps.user
        };
      });
    }
    if (nextProps.user === "resetForm") {
      this.setState({
        userForm: {
          email: "",
          userName: ""
        }
      });
    }
    if (nextProps.user.type === "updateUser") {
      this.setState({
        userForm: nextProps.user.data
      });
    }
  }

  onChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const udpatedForm = update(this.state.userForm, {
      [name]: { $set: value }
    });
    this.setState({ userForm: udpatedForm });
  }

  createUser() {
    dashboardService
      .create(this.state.userForm)
      .then(userData => {
        this.props.newUser({ data: userData, type: "addUser" });
      })
      .catch(err => console.log(err));
  }

  updateUser() {
    const userId = this.state.userForm._id;
    const userData = {
      userName: this.state.userForm.userName,
      email: this.state.userForm.email
    };
    dashboardService.update(userId, userData).catch(err => console.log(err));
  }

  resetForm() {
    this.props.resetForm("resetForm");
  }

  render() {
    return (
      <React.Fragment>
        {/* <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Create a user</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            name="email"
            onChange={this.onChange}
            value={this.state.userForm.email}
          />
          <label htmlFor="inputPassword" className="sr-only">
            UserName
          </label>
          <input
            type="text"
            id="inputPassword"
            className="form-control"
            placeholder="UserName"
            name="userName"
            onChange={this.onChange}
            value={this.state.userForm.userName}
          />

          {!this.state.userForm.edit ? (
            <button
              onClick={this.createUser}
              className="btn btn-lg btn-primary btn-block"
              type="button"
            >
              Create
            </button>
          ) : (
            <button
              onClick={this.updateUser}
              className="btn btn-lg btn-warning btn-block"
              type="button"
            >
              Update User
            </button>
          )}
          <button
            onClick={this.resetForm}
            className="btn btn-lg btn-default btn-block"
            style={{ border: "1px black solid" }}
            type="button"
          >
            Reset
          </button>
          <DeleteUserButton
            user={{ data: this.state.userForm, type: "updateUser" }}
            deleteUser={this.props.deleteUser}
          />
        </form> */}
        <div className="login-dark" style={{ height: "100vh" }}>
          <form method="post">
            <h2 className="sr-only">Login Form</h2>
            <div className="illustration">
              <i className="icon ion-ios-locked-outline" />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Log In
              </button>
            </div>
            <a href="#" className="forgot">
              Forgot your email or password?
            </a>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateUserForm;
