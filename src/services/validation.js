import update from "immutability-helper";

function validateFormInputs(event) {
  debugger;
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
    debugger;
    this.setState({ registerForm: validatedInput }, () => {
      passwordMatch.call(this);
    });
  }
}

function passwordMatch() {
  const password = this.state.registerForm.password.value;
  const passwordConfirm = this.state.registerForm.passwordConfirm.value;
  if (password === passwordConfirm) {
    this.setState({ passwordMatch: true }, () => {
      isFormValid.call(this);
    });
  } else {
    this.setState({ passwordMatch: false }, () => {
      isFormValid.call(this);
    });
  }
}

function isFormValid() {
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

export { validateFormInputs };
