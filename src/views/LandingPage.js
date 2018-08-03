import React from "react";
import RegisterForm from "../components/forms/_RegisterForm";
import ErrorMessages from "../components/ErrorMessages";
import { FormWrapper } from "./LandingPage.styles.js";

class LandingPage extends React.Component {
  state = {};

  render() {
    return (
      <FormWrapper>
        <ErrorMessages />
        <RegisterForm />
      </FormWrapper>
    );
  }
}

export default LandingPage;
