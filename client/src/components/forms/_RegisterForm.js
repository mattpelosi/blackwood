import React from "react";
import update from "immutability-helper";
import { validate } from "../../services/validation.js";
import { Form, Button, Input, P } from "./_RegisterForm.styles.js";
import { connect } from "react-redux";
import {
  addErrorMessages,
  shouldDisplayErrors
} from "../../actions/registerForm.js";
import * as userRequests from "../../HTTPRequests/user.requests.js";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
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
    this.setState(newState, this.props.addErrorMessages(errorMessages));
  };

  submitForm = () => {
    if (this.state.isValid) {
      userRequests.registerUser(this.state);
    } else {
      this.props.shouldDisplayErrors(true);
    }
  };

  // changeInputDepth = e => {
  //   e.key === "Enter" && this.setState({ number: e.target.value });
  // };

  render() {
    const { email, password, passwordConfirm, isValid } = this.state;

    return (
      <Form isValid={isValid}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.onChange}
          // depth={number}
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
        <Button isValid={isValid} onClick={this.submitForm}>
          Register
        </Button>
        <P>
          <a>Login</a>
        </P>
        {/* <input type="number" onKeyPress={this.changeInputDepth} /> */}
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addErrorMessages: errors => {
    dispatch(addErrorMessages(errors));
  },
  shouldDisplayErrors: bool => {
    dispatch(shouldDisplayErrors(bool));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);
