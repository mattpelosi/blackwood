import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Form = styled.div`
  display: flex;
  height: 240px;
  width: 400px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #505763;
  padding: 15px;
  border-radius: 5px;
  animation: ${fadeIn} 2s ease-in 1 forwards;
  transition-property: border, transform;
  transition-duration: 1s;
  opacity: 0.5;
  box-shadow: 0 3px 5px 3px #505763;
  transform: rotateX(20deg) translate3d(0, 0, 0);

  &:hover {
    border: 1px solid #bdc4cc;
    transform: translate3d(-0.1em, -2em, 3em) rotateX(20deg);
  }
`;

const Button = styled.button`
  font-family: Andale Mono, AndaleMono, monospace;
  font-size: 1.5em;
  color: #939aa1;
  height: 22%;
  align-self: stretch;
  padding: 4px;
  margin: 2px;
  border: 1px solid rgb(80, 74, 74);
  border-radius: 3px;
  background: #343638;
  text-shadow: unset;
  transition-property: text-shadow, color, opacity;
  transition-duration: 1s;
  outline: none;
  opacity: 0.5;

  &:hover {
    color: white;
    opacity: 1;
  }

  &:active {
    border: 1px solid #898b8e;
  }
`;

const Input = styled.input`
  font-family: Andale Mono, AndaleMono, monospace;
  color: #d0d8e0;
  font-size: 1em;
  height: 20%;
  align-self: stretch;
  margin: 2px;
  padding: 4px;
  border: 1px solid black;
  border-radius: 3px;
  background: black;
  border: 1px solid #505763;
  transition: border 1s;
  outline: none;
  /* transform: rotateX(10deg); */

  &:placeholder {
    color: #949ea8;
  }

  &:hover {
    border: 1px solid #bdc4cc;
  }
`;

const P = styled.p`
  color: #aeb9c5;
  height: 1em;
  margin-top: 10px;
  margin-bottom: 0;
  font-family: Andale Mono, AndaleMono, monospace;
  opacity: 0.5;
  transition-property: opacity;
  transition-duration: 1s;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
    cursor: default;
  }

  &:active {
    color: rgb(216, 204, 204);
  }
`;

export { Form, Button, Input, P };
