import React from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

class ErrorMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldDisplayMessage: false
    };
  }

  // componentDidUpdate(prevProps) {
  //   this.props.errorMessages;
  // }

  shouldDisplayMessage = val => {
    this.setState({ shouldDisplayMessage: val });
  };

  render() {
    const { errors, shouldDisplayErrors } = this.props;
    const { shouldDisplayMessage } = this.state;
    if (!shouldDisplayErrors) {
      return null;
    }

    return (
      <Box>
        <ErrorIcons>
          <i
            className="fa fa-exclamation-triangle"
            onMouseEnter={() => this.shouldDisplayMessage(true)}
            onMouseLeave={() => this.shouldDisplayMessage(false)}
          />
        </ErrorIcons>
        <Errors>
          <Message show={shouldDisplayMessage} hide={!shouldDisplayMessage}>
            Data
          </Message>
        </Errors>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  errorMessages: state.registerFormData.errorMessages,
  shouldDisplayErrors: state.registerFormData.shouldDisplayErrors
});

export default connect(
  mapStateToProps,
  null
)(ErrorMessages);

const fadeIn = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

const Box = styled.div`
  animation: ${fadeIn} 2s ease-in 1 forwards;
  display: flex;
  flex-direction: column;
  border: 1px solid #505763;
  padding: 15px;
  color: white;
`;

const ErrorIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #505763;
  height: 50px;
  height: 50px;
`;

const Errors = styled.div`
  border: 1px solid #505763;
  height: 50px;
  height: 50px;
`;

const Message = styled.p`
  ${({ show }) =>
    show &&
    `
    animation: ${fadeIn} 1s ease-in 1 forwards;
  `} ${({ hide }) =>
    hide &&
    `
    animation: ${fadeOut} 1s ease-in 1 forwards;
  `};
`;
