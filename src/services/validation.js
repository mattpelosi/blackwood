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
  let isValid = form.isValid;
  const errorMessages = [];

  for (const field in form) {
    switch (field) {
      case "email":
        const regexEmail = RegExp(/\S+@\S+\.\S+/);
        isValid = regexEmail.test(form[field]);
        !isValid && errorMessages.push("Please enter a valid email.");
        break;
      case "password":
        const tests = {
          regexDigit: {
            condition: RegExp(/(\d)/g),
            message: "Must have at least one number."
          },
          regexUpper: {
            condition: RegExp(/[A-Z]+/g),
            message: "Must have at least one uppercase letter."
          },
          regexLower: {
            condition: RegExp(/[a-z]+/g),
            message: "Must have at least one lowercase letter."
          },
          regexSpecialIn: {
            condition: RegExp(/[!@#$%^&*]+/g),
            message:
              "Must include at least one of the follow characters: !@#$%^&*"
          },
          regexSpecialOut: {
            condition: RegExp(/[^()<>\{\}\[\]\\\/]/gi),
            message: "Cannot include the following characters <>{}[]()/|"
          },
          regeexLength: {
            condition: RegExp(/.{8,32}/g),
            message: "Must be no less than 8 and no more than 32 in length."
          }
        };

        for (const regex in tests) {
          isValid = tests[regex].condition.test(form[field]);
          !isValid && errorMessages.push(tests[regex].message);
        }

        errorMessages.length > 0 && (isValid = false);

        break;
      case "passwordConfirm":
        if (form.password === form.passwordConfirm) {
          isValid = true;
        } else {
          isValid = false;
          errorMessages.push("Passwords don't match");
        }
        break;
      default:
    }
  }
  return { isValid, errorMessages };
}

export { validateFormInputs };
export { validate };
