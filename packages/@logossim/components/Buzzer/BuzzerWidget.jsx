import React from 'react';

import { Port } from '@logossim/core';

import styled from 'styled-components';

const PositionedPort = styled(Port)`
  position: absolute;
  ${props => `${props.side}: 28px`};
`;

const Body = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  background: ${props =>
    `rgba(62, 62, 62, ${props.selected ? 0.5 : 1})`};
  box-shadow: 0 0 ${props => (props.isActive ? 15 : 0)}px black;
  border: 2px solid
    ${props =>
      props.selected
        ? 'var(--border-selected)'
        : 'var(--border-unselected)'};
  border-radius: 15px;
`;

const Hole = styled.div`
  width: 8px;
  height: 8px;

  background: black;
  border-radius: 4px;
`;

export const Shape = ({ selected, isActive, children }) => (
  <Body selected={selected} isActive={isActive} data-testid="body">
    <Hole />
    {children}
  </Body>
);

const BuzzerWidget = props => {
  const { model } = props;
  const {
    options: { selected },
  } = model;

  const inputSides = ['right', 'bottom', 'left', 'top'];

  return (
    <Shape selected={selected} isActive={model.isActive()}>
      <PositionedPort
        name="in"
        side={inputSides[model.orientation]}
      />
    </Shape>
  );
};

export default BuzzerWidget;
