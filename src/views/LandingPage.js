import React from "react";
// import  from "../components/forms/RegisterForm";
import RegisterForm from "../components/forms/_RegisterForm";
import "./landing.page.css";

class LandingPage extends React.Component {
  state = {};
  render() {
    return (
      <div className="Landing-page">
        <RegisterForm />
      </div>
    );
  }
}

export default LandingPage;
