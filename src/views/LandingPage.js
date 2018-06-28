import React from "react";
import RegisterForm from "../components/forms/RegisterForm";
import LoginForm from "../components/forms/LoginForm";
import './landing.page.css'

class LandingPage extends React.Component {
  state = {};
  render() {
    return (
      <div className="Landing-page">
        <RegisterForm />
        <LoginForm />
      </div>
    );
  }
}

export default LandingPage;
