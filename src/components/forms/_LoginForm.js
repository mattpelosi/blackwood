import React from "react";
import update from "immutability-helper";
import { validate } from "../../services/validation.js";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      isValid: false
    };
  }

  onChange = event => {
    const value = event.target.value;
    const field = event.target.name;
    const newState = update(this.state, {
      [field]: { $set: value }
    });
    const { isValid, errorMessages } = validate.call(this, newState);
    newState.isValid = isValid;
    newState.errorMessages = errorMessages;
    debugger;
    this.setState(() => newState);
  };

  submitForm = () => {
    if (this.state.isValid) {
      //submit form to server
    }
  };

  render() {
    const { email, password, passwordConfirm } = this.state;

    return (
      <React.Fragment>
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.onChange}
        />
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={this.onChange}
        />
        <button onClick={this.submitLogin}>Login</button>
        <p>
          <a>Register</a>
        </p>
      </React.Fragment>
    );
  }
}

export default LoginForm;
