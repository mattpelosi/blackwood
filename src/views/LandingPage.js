import React from "react";
// import  from "../components/forms/RegisterForm";
import RegisterForm from "../components/forms/_RegisterForm";
import { FormWrapper } from "./LandingPage.styles.js";

class LandingPage extends React.Component {
  state = {};
  render() {
    return (
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    );
  }
}

export default LandingPage;
