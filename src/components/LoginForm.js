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
          valid: false,
          placeholder: "Email"
        },
        password: {
          value: "",
          touched: false,
          valid: false,
          placeholder: "Password"
        },
        passwordConfirm: {
          value: "",
          touched: false,
          placeholder: "Confirm Password"
        }
      },
      passwordMatch: false,
      formValid: false,
      showFormmHelp: false
    };

    this.onChange = this.onChange.bind(this);
    // this.registerUser = this.registerUser.bind(this);
    this.validateFormInputs = this.validateFormInputs.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.passwordMatch = this.passwordMatch.bind(this);
    this.showFormHelp = this.showFormHelp.bind(this);
    this.hideFormHelp = this.hideFormHelp.bind(this);
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

  validateFormInputs(event) {
    const value = event.target.value;
    const field = event.target.name;
    const regex = {
      emailTest: /\S+@\S+\.\S+/,
      passwordTest: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,32}$/
    };
    let formValid = false;
    field === "email" && (formValid = regex.emailTest.test(value));
    field === "password" && (formValid = regex.passwordTest.test(value));
    if (value !== "") {
      const validatedInput = update(this.state.registerForm, {
        [field]: { valid: { $set: formValid }, touched: { $set: true } }
      });
      this.setState({ registerForm: validatedInput });
    }
    field === "passwordConfirm" && this.passwordMatch();
  }

  passwordMatch() {
    const password = this.state.registerForm.password.value;
    const passwordConfirm = this.state.registerForm.passwordConfirm.value;
    if (password === passwordConfirm) {
      this.setState({ passwordMatch: true });
    } else {
      this.setState({ passwordMatch: false });
    }
    this.isFormValid();
  }

  isFormValid() {
    if (
      this.state.registerForm.email.valid &&
      this.state.registerForm.password.valid &&
      this.state.passwordMatch
    ) {
      this.setState({ formValid: true });
    }
  }

  // registerUser(event) {
  //   event.preventDefault();
  //   if (this.state.passwordMatch) {
  //     const user = {
  //       email: this.state.registerForm.email.value,
  //       password: this.state.registerForm.password.value
  //     };
  //       usersService.create(user).catch(err => console.log(err));
  //   }
  // }

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
    const inputFields = [];
    let loopIndex = 0;

    for (let input in this.state.registerForm) {
      const key = input.replace(/"/g, "");
      inputFields.push(
        <React.Fragment key={loopIndex++}>
          <input
            className="Register-input"
            type={input === "email" ? "text" : "password"}
            name={input}
            placeholder={this.state.registerForm[input].placeholder}
            value={this.state.registerForm[key].value}
            onChange={this.onChange}
            onBlur={this.validateFormInputs}
          />

          {(key === "passwordConfirm"
            ? !this.state.passwordMatch
            : !this.state.registerForm[key].valid) &&
            this.state.registerForm[key].touched && (
              <i
                name={input}
                className="Valid-info fa fa-exclamation-triangle"
                onMouseEnter={this.showFormHelp.bind(this, input)}
                onMouseLeave={this.hideFormHelp}
              />
            )}
        </React.Fragment>
      );
    }

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
          {inputFields}
          <button
            className="Register-button"
            onClick={this.registerUser}
            disabled={!this.state.formValid}
          >
            Register
          </button>
          <p className="sign-in">- Sign in -</p>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;