import React from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

class ErrorMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldDisplayMessage = (bool, index) => {
    this.setState({
      shouldDisplayMessage: bool,
      index: index
    });
  };

  render() {
    const { shouldDisplayMessage, index } = this.state;
    const { shouldDisplayErrors, errorMessages } = this.props;

    if (!shouldDisplayErrors || !errorMessages) {
      return <Box />;
    }

    return (
      <Box>
        <ErrorIcons>
          {errorMessages.map((error, index) => {
            return (
              <Icon
                key={index}
                className="fa fa-exclamation-triangle"
                onMouseEnter={() => this.shouldDisplayMessage(true, index)}
                onMouseLeave={() => this.shouldDisplayMessage(false, index)}
              />
            );
          })}
        </ErrorIcons>
        <Errors>
          <Message show={shouldDisplayMessage} hide={!shouldDisplayMessage}>
            {errorMessages[index]}
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
  display: flex;
  flex-direction: column;
  padding: 15px;
  color: white;
  width: 400px;
  height: 50px;
  transform: rotateX(20deg) rotateY(10deg);
  transition-property: transform;
  transition-duration: 1s;

  &:hover {
    transform: translate3d(-0.1em, -1em, 3em) rotateX(20deg) rotateY(10deg);
  }
`;

const ErrorIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: auto;
  color: #949ea8;
  animation: ${fadeIn} 1s ease-in 1 forwards;
`;

const Icon = styled.i`
  height: 45px;
  width: 45px;


  &::before {
    position: relative;
    left: 0.8em;
    top: 0.8em;
    color: #B84932;
  }
`;

const Errors = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  color: #949ea8;
`;

const Message = styled.p`
  ${({ show }) =>
    show &&
    `
    animation: ${fadeIn} 0.5s ease-in 1 forwards;
  `} ${({ hide }) =>
    hide &&
    `
    animation: ${fadeOut} 0.5s ease-in 1 forwards;
  `};
  text-align: center;
`;
