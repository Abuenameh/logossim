import React from 'react';

import styled from 'styled-components';

import { Oscilloscope } from '../Icons';

const Container = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;

  background: rgb(224, 224, 224);
  background: linear-gradient(
    0deg,
    rgba(224, 224, 224, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );

  border: 1px solid gray;
  border-radius: 16px;

  z-index: 2;

  & > button {
    border-right: 1px solid gray;
    &:last-child {
      border-right: none;
    }
  }
`;

const Button = styled.button.attrs(({ ...props }) => ({
  ...props,
  type: 'button',
}))`
  background: none;
  border: none;

  font-size: 1.2em;

  min-width: 75px;
  min-height: 60px;

  &:disabled {
    & > svg {
      fill: #bfbfbf;
    }
  }
`;

const ShowOscilloscopeButton = ({ handleClick, disabled }) => (
  <Container id="show-oscilloscope-button">
    <Button
      onClick={handleClick}
      disabled={disabled}
      data-for="tooltip"
      data-tip="Show oscilloscope..."
      data-place="left"
    >
      <Oscilloscope />
    </Button>
  </Container>
);

export default ShowOscilloscopeButton;
