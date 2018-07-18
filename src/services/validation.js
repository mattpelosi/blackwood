import update from "immutability-helper";

function validateFormInputs(event) {
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

function validate(form) {
  let isValid = null;
  for (const field in form) {
    switch (field) {
      case "email":
        const regex = RegExp(/\S+@\S+\.\S+/);
        isValid = regex.test(form[field]);

        break;
      case "password":
        form[field];

        break;
      case "passwordConfirm":
        form[field];

        break;
      default:
    }
  }
  const newForm = update(form, {
    isValid: { $set: isValid }
  });
  this.setState(() => newForm);
}

export { validateFormInputs };
export { validate };
