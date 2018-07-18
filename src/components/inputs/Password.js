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
    const { placeholder, value, valid, touched } = this.state;
    return (
      <React.Fragment>
        <input
          className="Register-input"
          type="password"
          name="password"
          placeholder={placeholder}
          value={value}
          onChange={this.props.onChange}
        />

        {!valid &&
          touched && (
            <i
              name="password"
              className="Valid-info fa fa-exclamation-triangle"
              onMouseEnter={this.showFormHelp.bind(this)}
              onMouseLeave={this.hideFormHelp}
            />
          )}
      </React.Fragment>
    );
  }
}
export default Password;
