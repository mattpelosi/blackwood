import React from "react";
// import * as usersService from "../../services/users.service";
import update from "immutability-helper";
import { CSSTransition } from "react-transition-group";

class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      registerForm: {
        email: {
          value: "",
          touched: false,
          valid: false
        },
        password: {
          value: "",
          touched: false,
          valid: false
        },
        passwordConfirm: {
          value: "",
          touched: false,
          valid: false
        }
      },
      passwordMatch: false,
      formValid: false,
      showFormmHelp: false
    };

    this.onChange = this.onChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.validateFormInputs = this.validateFormInputs.bind(this);
    this.passwordMatch = this.passwordMatch.bind(this);
    this.showFormHelp = this.showFormHelp.bind(this);
    this.hideFormHelp = this.hideFormHelp.bind(this);
  }

  validateFormInputs(event) {
    const value = event.target.value;
    const field = event.target.name;
    const regex = {
      emailTest: /\S+@\S+\.\S+/,
      passwordTest: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,32}$/
    };
    let formValid = false;
    field === "email" && (formValid = regex.emailTest.test(value));
    debugger;
    field === "password" && (formValid = regex.passwordTest.test(value));
    if (value !== "") {
      const validatedInput = update(this.state.registerForm, {
        [field]: { valid: { $set: formValid }, touched: { $set: true } }
      });
      this.setState({ registerForm: validatedInput });
    }
    field === "passwordConfirm" && this.passwordMatch();
  }

  onChange(event) {
    const value = event.target.value;
    const field = event.target.name;
    const udpatedForm = update(this.state.registerForm, {
      [field]: { value: { $set: value } }
    });
    this.setState({ registerForm: udpatedForm });
    if (value === "") {
      const untouched = update(this.state.registerForm, {
        [field]: { value: { $set: "" }, touched: { $set: false } }
      });
      this.setState({ registerForm: untouched });
    }
  }

  passwordMatch() {
    const password = this.state.registerForm.password.value;
    const passwordConfirm = this.state.registerForm.passwordConfirm.value;
    if (
      password.value !== "" &&
      password.valid &&
      passwordConfirm.value !== "" &&
      password.value === passwordConfirm.value
    ) {
      this.setState({ passwordMatch: true });
    } else {
      this.setState({ passwordMatch: false });
    }
  }

  registerUser(event) {
    event.preventDefault();
    if (this.state.passwordMatch) {
      const user = {
        email: this.state.registerForm.email.value,
        password: this.state.registerForm.password.value
      };
      //   usersService.create(user).catch(err => console.log(err));
    }
  }

  showFormHelp(field) {
    let help = {
      email: "Please enter a valid email address",
      password:
        "Your password must have at least 8 characters, one number, and one of the following: !@#$%^&*",
      confirmPassword: "Your passwords don't match"
    };
    let message = "";
    field === "email" && (message = help.email);
    field === "password" && (message = help.password);
    field === "confirm-password" && (message = help.confirmPassword);
    this.setState({
      showFormHelp: true,
      formHelpMessage: message
    });
  }

  hideFormHelp() {
    this.setState({
      showFormHelp: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="Form-help">
          <CSSTransition
            in={this.state.showFormHelp}
            timeout={5000}
            classNames="Form-help"
            unmountOnExit
          >
            <span>{this.state.formHelpMessage}</span>
          </CSSTransition>
        </div>
        <div className="Login-form">
          <input
            className="Register-input"
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.registerForm.email.value}
            onChange={this.onChange}
            onBlur={this.validateFormInputs}
          />
          {!this.state.registerForm.email.valid &&
            this.state.registerForm.email.touched && (
              <i
                name="email"
                className="Valid-info fa fa-exclamation-triangle"
                onMouseEnter={this.showFormHelp.bind(this, "email")}
                onMouseLeave={this.hideFormHelp}
              />
            )}
          <input
            className="Register-input"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.registerForm.password.value}
            onChange={this.onChange}
            onBlur={this.validateFormInputs}
          />
          {!this.state.registerForm.password.valid &&
            this.state.registerForm.password.touched && (
              <i
                name="password"
                className="Valid-info fa fa-exclamation-triangle"
                onMouseEnter={this.showFormHelp.bind(this, "password")}
                onMouseLeave={this.hideFormHelp}
              />
            )}

          <input
            className="Register-input"
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            value={this.state.registerForm.passwordConfirm.value}
            onChange={this.onChange}
            onBlur={this.validateFormInputs}
          />
          {!this.state.passwordMatch &&
            this.state.registerForm.passwordConfirm.touched && (
              <i
                name="confirm-password"
                className="Valid-info fa fa-exclamation-triangle"
                onMouseEnter={this.showFormHelp.bind(this, "confirm-password")}
                onMouseLeave={this.hideFormHelp}
              />
            )}
          <button className="Register-button" onClick={this.registerUser}>
            Register
          </button>
          <p className="sign-in">- Sign in -</p>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
