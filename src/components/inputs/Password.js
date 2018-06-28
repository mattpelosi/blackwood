import React from "react";

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      touched: false,
      valid: false,
      placeholder: "Email",
      mode: ["Login", "Register"],
      helpMessage:
        "Your password must have at least 8 characters, one number, and one of the following: !@#$%^&*"
    };
  }
  render() {
    return (
      <React.Fragment>
        <div />
      </React.Fragment>
    );
  }
}
export default Password;
