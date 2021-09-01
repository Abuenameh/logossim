import React from 'react';

import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.75);
`;

const Window = styled.div`
  display: flex;
  flex-direction: column;

  width: ${props => `${props.width}vw`};
  height: ${props => `${props.height}vh`};

  max-width: ${props => `${props.maxWidth}`};
  max-height: ${props => `${props.maxHeight}`};

  background: white;

  border: 1px solid black;
  border-radius: 25px;

  padding: 16px;

  z-index: 4;
`;

const Modal = ({ width = 60, height = 80, maxDim = true, children }) => (
  <Overlay>
    <Window
      width={width}
      height={height}
      maxWidth={maxDim ? "600px" : "none"}
      maxHeight={maxDim ? "800px" : "none"}
    >
      {children}
    </Window>
  </Overlay>
);

export default Modal;
