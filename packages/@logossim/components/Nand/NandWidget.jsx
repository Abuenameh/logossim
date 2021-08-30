import React from 'react';

import { Port } from '@logossim/core';

import styled from 'styled-components';

import { PortExtension, distributePorts } from '../portExtendUtils';

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
    if (props.name === 'out') return '';
    return `${props.edge}: ${props.position * 15 - 5}px;`;
  }}

  ${props => {
    if (props.name === 'out') return `${props.side}: 100px`;
    return `${props.side}: 103px`;
  }};
`;

export const Shape = ({ size = 90, dWidth = 15, dHeight = 0, vbWidth = 27.781249, vbHeight = 23.812501, orientation = 0, translation = 0 }) => (
  <svg
    height={size + dHeight}
    width={size + dWidth}
    viewBox={`0 0 ${vbWidth} ${vbHeight}`}
    fill="var(--body-unselected)"
    stroke="var(--border-unselected)"
    strokeWidth="var(--border-width)"
  >
    <g transform={`scale(0.26458333) rotate(${orientation*90} 45 45) translate(${translation})`}>
      <path d="m 2,2 v 43 a 42.999999,42.999999 0 0 0 0,0.271484 V 88 H 45 A 42.999999,42.999999 0 0 0 88,45 42.999999,42.999999 0 0 0 45,2 h -0.271484 z" />
      <circle r="5.72056" cy="45" cx="94.27944" />
    </g>
  </svg>
);

const NandWidget = props => {
  const { model } = props;

  const inputPorts = Object.values(model.getInputPorts());
  const portPositions = distributePorts(inputPorts.length);

  const orientation = model.orientation;
  const inputEdges = ['top', 'left', 'top', 'left'];
  const inputSides = ['right', 'bottom', 'left', 'top'];
  const outputSides = ['left', 'top', 'right', 'bottom'];

  const dWidths = [15, 0];
  const dHeights = [0, 15];
  const vbWidths = [27.781249, 23.812501];
  const vbHeights = [23.812501, 27.781249];
  const translations = [0, 0, -15, -15];

  return (
    <Wrapper
      selected={model.isSelected()}
      width={90 + dWidths[orientation % 2]}
      height={90 + dHeights[orientation % 2]}
    >
      <PortExtension
        selected={model.isSelected()}
        portPositions={portPositions}
      />
      {inputPorts.map((port, i) => (
        <PositionedPort
          key={port.getName()}
          name={port.getName()}
          position={portPositions[i]}
          edge={inputEdges[orientation]}
          side={inputSides[orientation]}
        />
      ))}
      <PositionedPort
        name="out"
        side={outputSides[orientation]}
      />
      <Shape
        dWidth={dWidths[orientation % 2]}
        dHeight={dHeights[orientation % 2]}
        vbWidth={vbWidths[orientation % 2]}
        vbHeight={vbHeights[orientation % 2]}
        orientation={orientation}
        translation={translations[orientation]}
      />
    </Wrapper>
  );
};

export default NandWidget;
