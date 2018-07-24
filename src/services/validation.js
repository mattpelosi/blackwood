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
        if (
          errorMessages.length === 0 &&
          form.password !== "" &&
          form.password === form.passwordConfirm
        ) {
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

export { validate };
