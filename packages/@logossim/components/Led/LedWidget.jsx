import React from 'react';

import { Port } from '@logossim/core';

import styled from 'styled-components';

const PositionedPort = styled(Port)`
  position: absolute;
  ${props => `${props.side}: 28px`};
`;

export const Shape = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  background: ${props =>
    `${props.color}${props.selected ? '80' : 'ff'}`};
  box-shadow: 0 0 ${props => (props.isActive ? 15 : 0)}px
    ${props => props.color};
  border: 2px solid
    ${props =>
      props.selected
        ? 'var(--border-selected)'
        : 'var(--border-unselected)'};
  border-radius: 15px;
`;

const LedWidget = props => {
  const { model } = props;
  const {
    options: { selected },
  } = model;

  const inputSides = ['right', 'bottom', 'left', 'top'];

  return (
    <Shape
      selected={selected}
      color={model.getColor()}
      isActive={model.isActive()}
      data-testid="shape"
    >
      <PositionedPort
        name="in"
        side={inputSides[model.orientation]}
      />
    </Shape>
  );
};

export default LedWidget;
