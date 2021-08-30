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
    if (props.name === 'control') return `${props.side}: 30px;`;
    if (props.name === 'in') return `${props.side}: 30px;`;
    if (props.name === 'out') return `${props.side}: 30px;`;
    return '';
  }}
`;

export const Shape = ({ size = 30, orientation, x1 = 22.5, y1 = 32.5, x2 = 22.5, y2 = 45 }) => (
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
      <line x1="22.5" y1="32.5" x2="22.5" y2="45" />
    </g>
  </svg>
);

const ControlledBufferWidget = props => {
  const { model } = props;
  const {
    options: { selected },
  } = model;

  const orientation = model.orientation;
  const controlSides = ['top', 'right', 'bottom', 'left'];
  const inputSides = ['right', 'bottom', 'left', 'top'];
  const outputSides = ['left', 'top', 'right', 'bottom'];
  const x1s = [22.5, 0];
  const y1s = [32.5, 22.5];
  const x2s = [22.5, 12.5];
  const y2s = [45, 22.5];

  return (
    <Wrapper selected={selected}>
      <PositionedPort
        name="control"
        side={controlSides[orientation]}
      />
      <PositionedPort
        name="in"
        side={inputSides[orientation]}
      />
      <PositionedPort
        name="out"
        side={outputSides[orientation]}
      />
      <Shape
        orientation={orientation}
        x1={x1s[orientation % 2]}
        y1={y1s[orientation % 2]}
        x2={x2s[orientation % 2]}
        y2={y2s[orientation % 2]}
      />
    </Wrapper>
  );
};

export default ControlledBufferWidget;
