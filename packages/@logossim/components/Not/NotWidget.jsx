import React from 'react';

import { Port } from '@logossim/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${props => props.width}px;
  height: ${props => props.height}px;

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
    if (props.name === 'in') return `${props.side}: 45px;`;
    if (props.name === 'out') return `${props.side}: 39px;`;
    return '';
  }}
`;

export const Shape = ({ size = 30, dWidth = 15, dHeight = 0, orientation = 0, translation = 0 }) => (
  <svg
    height={size + dHeight}
    width={size + dWidth}
    viewBox="11 0 45.0 45.0"
    fill="var(--body-unselected)"
    stroke="var(--border-unselected)"
    strokeWidth="var(--border-width)"
  >
    <g transform={`rotate(${orientation*90} 28 17) translate(${translation})`}>
      <path d="M 1.0207771,1.6492624 V 43.357967 L 42.724327,22.649262 Z" />
      <circle r="8" cy="22" cx="51" />
    </g>
  </svg>
);

const NotWidget = props => {
  const { model } = props;
  const {
    options: { selected },
  } = model;

  const orientation = model.orientation;
  const inputSides = ['right', 'bottom', 'left', 'top'];
  const outputSides = ['left', 'top', 'right', 'bottom'];

  const dWidths = [15, 0];
  const dHeights = [0, 15];
  const translations = ['0 0', '0 -11', '-12 -11', '-12 0'];

  return (
    <Wrapper
      selected={selected}
      width={30 + dWidths[orientation % 2]}
      height={30 + dHeights[orientation % 2]}
    >
      <PositionedPort
        name="in"
        side={inputSides[orientation]}
      />
      <PositionedPort
        name="out"
        side={outputSides[orientation]}
      />
      <Shape
        dWidth={dWidths[orientation % 2]}
        dHeight={dHeights[orientation % 2]}
        orientation={orientation}
        translation={translations[orientation]}
      />
    </Wrapper>
  );
};

export default NotWidget;
