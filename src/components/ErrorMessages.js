import React from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
// import update from "immutability-helper";

class ErrorMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldDisplayMessage = (val, index) => {
    this.setState({
      shouldDisplayMessage: val,
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
              <i
                name={index}
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
  animation: ${fadeIn} 1s ease-in 1 forwards;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #505763; */
  padding: 15px;
  color: white;
  width: 400px;
  height: 50px;
`;

const ErrorIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  /* border: 1px solid #505763; */
  width: auto;
  color: #949ea8;
`;

const Errors = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  /* border: 1px solid #505763; */
  color: #949ea8;
`;

const Message = styled.p`
  ${({ show }) =>
    show &&
    `
    animation: ${fadeIn} 1s ease-in 1 forwards;
  `} ${({ hide }) =>
    hide &&
    `
    animation: ${fadeOut} .5s ease-in 1 forwards;
  `};
  text-align: center;
`;
