import React from 'react';

import { Port } from '@logossim/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  svg {
    transition: 100ms linear;
    fill: ${props =>
      props.selected
        ? 'var(--body-selected)'
        : 'var(--body-unselected)'};
    stroke: ${props =>
      props.selected
        ? 'var(--border-selected)'
        : 'var(--border-unselected)'};
  }
`;

const PositionedPort = styled(Port)`
  position: absolute;
  ${props => {
    if (props.name === 'in') return `${props.side}: 29px;`;
    if (props.name === 'out') return `${props.side}: 29px;`;
    return '';
  }}
`;

export const Shape = ({ size = 30, orientation }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 45.0 45.0"
    fill="var(--body-unselected)"
    stroke="var(--border-unselected)"
    strokeWidth="var(--border-width)"
  >
    <g
      style={{
        transform: `rotate(${orientation*90}deg)`,
        transformOrigin: 'center',
      }}
    >
      <path d="M 1.0207771,1.6492624 V 43.357967 L 42.724327,22.649262 Z" />
    </g>
  </svg>
);

const BufferWidget = props => {
  const { model } = props;
  const {
    options: { selected },
  } = model;

  const orientation = model.orientation;
  const inputSides = ['right', 'bottom', 'left', 'top'];
  const outputSides = ['left', 'top', 'right', 'bottom'];

  return (
    <Wrapper selected={selected}>
      <PositionedPort
        name="in"
        side={inputSides[orientation]}
      />
      <PositionedPort
        name="out"
        side={outputSides[orientation]}
      />
      <Shape orientation={orientation} />
    </Wrapper>
  );
};

export default BufferWidget;
