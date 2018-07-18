import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isValid: false
    };
  }

  onChange = event => {
    const value = event.target.value;
    const field = event.target.name;
    this.setState({
      [field]: value
    });
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
      </React.Fragment>
    );
  }
}

export default LoginForm;
