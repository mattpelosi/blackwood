import React from "react";
import update from "immutability-helper";
import { validate } from "../../services/validation.js";
import { Form, Button, Input, P } from "./_RegisterForm.styles.js";

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
    const { isValid, errorMessages } = validate(newState);
    newState.isValid = isValid;
    newState.errorMessages = errorMessages;
    this.setState(() => newState);
  };

  submitForm = () => {
    if (this.state.isValid) {
      //submit form to server
    } else {

    }
  };

  render() {
    const { email, password, passwordConfirm } = this.state;

    return (
      <Form>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.onChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.onChange}
        />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={this.onChange}
        />
        <Button onClick={this.submitLogin}>Login</Button>
        <P>
          <a>Register</a>
        </P>
      </Form>
    );
  }
}

export default LoginForm;
