function validate(form) {
  let isValid = form.isValid;
  const errorMessages = [];

  for (const field in form) {
    switch (field) {
      case "email":
        const regexEmail = RegExp(/\S+@\S+\.\S+/);
        isValid = regexEmail.test(form[field]);
        !isValid && errorMessages.push("Your email isn't valid.");
        break;
      case "password":
        const tests = {
          regexDigit: {
            condition: RegExp(/(\d)/g),
            message: "Password needs a number."
          },
          regexUpper: {
            condition: RegExp(/[A-Z]+/g),
            message: "Password's missing an uppercase letter."
          },
          regexLower: {
            condition: RegExp(/[a-z]+/g),
            message: "Password's missing a lowercase letter."
          },
          regexSpecialIn: {
            condition: RegExp(/[!@#$%^&*]+/g),
            message:
              "Password needs one of the following characters: !@#$%^&*"
          },
          regexSpecialOut: {
            condition: RegExp(/[^()<>\{\}\[\]\\\/]/gi),
            message: "Password can't have any of these characters <>{}[]()/|"
          },
          regeexLength: {
            condition: RegExp(/.{8,32}/g),
            message: "Password's length has gotta be between 8 and 32 characters."
          }
        };

        for (const regex in tests) {
          isValid = tests[regex].condition.test(form[field]);
          !isValid && errorMessages.push(tests[regex].message);
        }

        errorMessages.length > 0 && (isValid = false);

        break;
      case "passwordConfirm":
        if (
          errorMessages.length === 0 &&
          form.password !== "" &&
          form.password === form.passwordConfirm
        ) {
          isValid = true;
        } else if (form.password !== form.passwordConfirm) {
          errorMessages.push("Passwords don't match");
          isValid = false;
        }
        break;
      default:
    }
  }
  return { isValid, errorMessages };
}

export { validate };
