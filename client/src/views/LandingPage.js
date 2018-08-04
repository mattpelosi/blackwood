import React from "react";
import RegisterForm from "../components/forms/_RegisterForm";
import ErrorMessages from "../components/ErrorMessages";
import styled from "styled-components";

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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: black;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;
