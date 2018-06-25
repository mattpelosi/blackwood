import React from "react";
// import * as usersService from "../../services/users.service";
import update from "immutability-helper";
import { CSSTransition } from "react-transition-group";

class RegisterForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      registerForm: {
        email: {
          value: "",
          touched: false,
          valid: false,
          placeholder: "Email",
          mode: ["Login", "Register"]
        },
        password: {
          value: "",
          touched: false,
          valid: false,
          placeholder: "Password",
          mode: ["Login", "Register"]
        },
        passwordConfirm: {
          value: "",
          touched: false,
          placeholder: "Confirm Password",
          mode: ["Register"]
        }
      },
      passwordMatch: false,
      formValid: false,
      showFormmHelp: false,
      mode: "Login"
    };

    this.onChange = this.onChange.bind(this);
    this.validateFormInputs = this.validateFormInputs.bind(this);
    this.passwordMatch = this.passwordMatch.bind(this);
    this.isFormValid = this.isFormValid.bind(this);

    //this.registerUser = this.registerUser.bind(this);
    //this.loginUser = this.loginUser.bind(this);

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
    this.validateFormInputs(event);
  }

  validateFormInputs(event) {
    // debugger;
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
        [field]: {
          value: { $set: value },
          valid: { $set: formValid },
          touched: { $set: true }
        }
      });
      this.setState({ registerForm: validatedInput }, () => {
        this.passwordMatch();
      });
    }
  }

  passwordMatch() {
    const password = this.state.registerForm.password.value;
    const passwordConfirm = this.state.registerForm.passwordConfirm.value;
    if (password === passwordConfirm) {
      this.setState({ passwordMatch: true }, () => {
        this.isFormValid();
      });
    } else {
      this.setState({ passwordMatch: false }, () => {
        this.isFormValid();
      });
    }
  }

  isFormValid() {
    if (
      this.state.registerForm.email.valid &&
      this.state.registerForm.password.valid &&
      this.state.passwordMatch
    ) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
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
      passwordConfirm: "Your passwords don't match"
    };
    let message = "";
    field === "email" && (message = help.email);
    field === "password" && (message = help.password);
    field === "passwordConfirm" && (message = help.passwordConfirm);
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
      debugger;
      if (this.state.registerForm[input].mode.includes(this.state.mode)) {
        inputFields.push(
          <React.Fragment key={loopIndex++}>
            <input
              className="Register-input"
              type={input === "email" ? "text" : "password"}
              name={input}
              placeholder={this.state.registerForm[input].placeholder}
              value={this.state.registerForm[key].value}
              onChange={this.onChange}
              // onBlur={this.validateFormInputs}
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
        <div className="register-form">
          {inputFields}
          <button
            className="Register-button"
            onClick={this.registerUser}
            disabled={!this.state.formValid}
          >
            {this.state.mode}
          </button>
          <p className="sign-in">
            - {this.state.mode === "Login" ? "Register" : "Login"}-
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
