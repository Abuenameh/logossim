import React, { Fragment } from 'react';

import { Port } from '@logossim/core';

import styled from 'styled-components';

import { PortExtension, distributePorts } from '../portExtendUtils';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 90px;

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

const PortExtensionConnector = styled.div`
  position: absolute;
  z-index: -1;

  background: ${props =>
    props.selected
      ? 'var(--border-selected)'
      : 'var(--border-unselected)'};

  height: 2px;
  width: 15px;

  top: ${props => props.position * 15 - 1}px;
  left: -2px;
`;

const PositionedPort = styled(Port)`
  position: absolute;

  ${props => {
    if (props.name === 'out') return '';
    return `${props.edge}: ${props.position * 15 - 5}px;`;
  }}

  ${props => {
    if (props.name === 'out') return `${props.side}: 88px`;
    return `${props.side}: 88px`;
  }};
`;

export const Shape = ({ size = 90, portPositions = [], orientation = 0, portWidth = 0.5, portColor }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 23.812499 23.812501"
    fill="var(--body-unselected)"
    stroke="var(--border-unselected)"
    strokeWidth="var(--border-width)"
  >
    <g
      transform={`rotate(${orientation*90} 12 12)`}
    >
      <path
        fill="none"
        style={{
          transform:
            'scale(0.284583, 0.284583) translate(-1px, -3px)',
        }}
        d="m 11.926664,1.1161165 c 5.50133,9.5176855 9.663162,25.9796645 9.66318,42.6065395 m 0,0 c 1.62e-4,18.330222 -4.950245,36.216284 -11.386335,45.249616"
      />
      <g transform="translate(1.8657598)">
        <path
          d="m 12.810547,2 c 5.50133,9.517685 8.779279,25.095781 8.779297,41.722656 C 21.590006,62.052878 17.611871,78.966668 11.175781,88 H 37.875 c 23.748245,0 43.005576,-42.349157 43,-43 -0.0058,-0.677686 -19.251755,-43 -43,-43 h -0.271484 z"
          transform="scale(0.26458333)"
        />
      </g>
    </g>
    <g
      transform={`scale(0.26458333) rotate(${orientation*90} 45 45)`}
      strokeWidth={portWidth}
      stroke={portColor}
    >
      {portPositions.includes(1) && (
        <path d="M 18.4669,15.5 H 1.44549" />
      )}
      {portPositions.includes(2) && (
        <path d="M 20.1902,30.5 H 1.445" />
      )}
      {portPositions.includes(3) && (
        <path d="M 21.1563,45.5 H 1.445" />
      )}
      {portPositions.includes(4) && (
        <path d="M 19.8489,60.5 H 1.445" />
      )}
      {portPositions.includes(5) && (
        <path d="M 16.5984,75.5 H 1.445" />
      )}
    </g>
  </svg>
);

const XorWidget = props => {
  const { model } = props;

  const inputPorts = Object.values(model.getInputPorts());
  const portPositions = distributePorts(inputPorts.length);

  const portWidth = inputPorts[0].getLineWidth();
  const portColor = inputPorts[0].getLineColor();

  const orientation = model.orientation;
  const inputEdges = ['top', 'left', 'top', 'left'];
  const inputSides = ['right', 'bottom', 'left', 'top'];
  const outputSides = ['left', 'top', 'right', 'bottom'];

  return (
    <Wrapper selected={model.options.selected}>
      <PortExtension
        selected={model.isSelected()}
        portPositions={portPositions}
        offsetX={12}
      />
      {inputPorts.map((port, i) => (
        <Fragment key={port.getName()}>
          <PositionedPort
            name={port.getName()}
            position={portPositions[i]}
            edge={inputEdges[orientation]}
            side={inputSides[orientation]}
          />
          {(portPositions[i] < 1 || portPositions[i] > 5) && (
            <PortExtensionConnector
              selected={model.isSelected()}
              position={portPositions[i]}
            />
          )}
        </Fragment>
      ))}
      <PositionedPort
        name="out"
        side={outputSides[orientation]}
      />
      <Shape
        portPositions={portPositions}
        orientation={orientation}
        portWidth={portWidth}
        portColor={portColor}
      />
    </Wrapper>
  );
};

export default XorWidget;
