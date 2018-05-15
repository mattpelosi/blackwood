import React from "react";
import * as dashboardService from "../services/dashboard.service";
import DeleteUserButton from "./DeleteUserButton";
import update from "immutability-helper";
import { flash, fadeIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
import ReactTooltip from "react-tooltip";

class CreateUserForm extends React.PureComponent {
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
      formValid: false
    };

    this.onChange = this.onChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.validateFormInputs = this.validateFormInputs.bind(this);
    this.passwordMatch = this.passwordMatch.bind(this);
  }

  validateFormInputs(event) {
    const value = event.target.value;
    const name = event.target.name;
    const emailTest = /\S+@\S+\.\S+/;
    const passwordTest = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/;
    let formValid = false;
    if (name === "email") {
      formValid = emailTest.test(value);
    }
    if (name === "password") {
      formValid = passwordTest.test(value);
    }
    if (name === "passwordConfirm") {
      formValid = passwordTest.test(value);
    }
    if (value !== "") {
      const validatedInput = update(this.state.registerForm, {
        [name]: { valid: { $set: formValid }, touched: { $set: true } }
      });
      this.setState({ registerForm: validatedInput });
      this.passwordMatch();
    }
  }

  onChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const udpatedForm = update(this.state.registerForm, {
      [name]: { value: { $set: value } }
    });
    this.setState({ registerForm: udpatedForm });
    if (value === "") {
      const untouched = update(this.state.registerForm, {
        [name]: { value: { $set: "" }, touched: { $set: false } }
      });
      this.setState({ registerForm: untouched });
    }
  }

  passwordMatch() {
    let password = this.state.registerForm.password;
    let passwordConfirm = this.state.registerForm.passwordConfirm;
    if (
      password.value !== "" &&
      password.valid &&
      passwordConfirm.value !== "" &&
      password.valid &&
      password.value === passwordConfirm.value
    ) {
      this.setState({ passwordMatch: true });
    } else {
      this.setState({ passwordMatch: false });
    }
  }

  registerUser() {
    if (!this.state.passwordMatch) {
      //do something that indicates to the user that the passwords don't
    } else {
      dashboardService
        .create(this.state.userForm)
        .then(userData => {
          this.props.newUser({ data: userData, type: "addUser" });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <React.Fragment>
        <StyleRoot>
          <div className="login-dark" style={{ height: "100vh" }}>
            <form>
              <div className="illustration">
                <i className="icon ion-ios-locked-outline" />
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-11">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      value={this.state.registerForm.email.value}
                      onChange={this.onChange}
                      onBlur={this.validateFormInputs}
                    />
                  </div>
                  {!this.state.registerForm.email.valid &&
                  this.state.registerForm.email.touched ? (
                    <div
                      className="col-1"
                      style={styles.flash}
                      data-tip
                      data-for="emailError"
                    >
                      <i
                        className="icon ion-ios-close-empty"
                        style={{ fontSize: "32px" }}
                      />
                      <ReactTooltip
                        id="emailError"
                        place="left"
                        type="dark"
                        effect="solid"
                      >
                        <p
                          style={{
                            fontSize: "11px",
                            maxWidth: "200px"
                          }}
                        >
                          Must enter a valid email address
                        </p>
                      </ReactTooltip>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-11">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      value={this.state.registerForm.password.value}
                      onChange={this.onChange}
                      onBlur={this.validateFormInputs}
                    />
                  </div>
                  {!this.state.registerForm.password.valid &&
                  this.state.registerForm.password.touched ? (
                    <div
                      className="col-1"
                      style={styles.flash}
                      data-tip
                      data-for="passwordError"
                    >
                      <i
                        className="icon ion-ios-close-empty"
                        style={{ fontSize: "32px" }}
                        datalacement="top"
                      />
                      <ReactTooltip
                        id="passwordError"
                        place="left"
                        type="dark"
                        effect="solid"
                      >
                        <p
                          style={{
                            fontSize: "11px",
                            maxWidth: "200px"
                          }}
                        >
                          Password must be at least 8 characters long and
                          include one letter, one number, and one special
                          character.
                        </p>
                      </ReactTooltip>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-11">
                    <input
                      type="password"
                      name="passwordConfirm"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={this.state.registerForm.passwordConfirm.value}
                      onChange={this.onChange}
                      onBlur={this.validateFormInputs}
                    />
                  </div>
                  {(!this.state.registerForm.passwordConfirm.valid &&
                    this.state.registerForm.passwordConfirm.touched) ||
                  (!this.state.passwordMatch &&
                    this.state.registerForm.passwordConfirm.touched) ? (
                    <div className="col-1" style={styles.flash}>
                      <i
                        className="icon ion-ios-close-empty"
                        style={{ fontSize: "32px" }}
                      />
                    </div>
                  ) : null}
                </div>
                {!this.state.passwordMatch &&
                this.state.registerForm.passwordConfirm.touched ? (
                  <div
                    className="row"
                    id="password-error"
                    style={styles.fadeIn}
                  >
                    <div className="col">
                      <p className="text-right">Passwords must match</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Register
                </button>
              </div>
              {/* <a href="#" className="forgot">
                Forgot your email or password?
              </a> */}
            </form>
          </div>
        </StyleRoot>
      </React.Fragment>
    );
  }
}

export default CreateUserForm;

const styles = {
  flash: {
    animation: "2s",
    // animationDelay: "1s",
    animationName: Radium.keyframes(flash, "bounce")
  },
  fadeIn: {
    animation: "2s",
    animationName: Radium.keyframes(fadeIn, "fadeIn")
  }
};
