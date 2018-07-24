import React from "react";
// import  from "../components/forms/RegisterForm";
import RegisterForm from "../components/forms/_RegisterForm";
import { FormWrapper } from "./LandingPage.styles.js";
import { connect } from "react-redux";

class LandingPage extends React.Component {
  state = {};

  // componentDidUpdate(prevProps) {}

  render() {
    return (
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  errorMessages: state.registerFormData.errorMessages
});

export default connect(
  mapStateToProps,
  null
)(LandingPage);
