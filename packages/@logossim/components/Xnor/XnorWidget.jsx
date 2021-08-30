import React, { Fragment } from 'react';

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

  transition: 100ms linear;
  svg {
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
    if (props.name === 'out') return `${props.side}: 100px`;
    return `${props.side}: 103px`;
  }};
`;

export const Shape = ({ size = 90, portPositions = [], dWidth = 15, dHeight = 0, vbWidth = 27.781249, vbHeight = 23.812501, orientation = 0, translation = 0, portWidth = 0.5, portColor }) => (
  <svg
    height={size + dHeight}
    width={size + dWidth}
    viewBox={`0 0 ${vbWidth} ${vbHeight}`}
    fill="var(--body-unselected)"
    stroke="var(--border-unselected)"
    strokeWidth="var(--border-width)"
  >
    <g transform={`rotate(${orientation*90} 12 12) translate(${translation})`}>
      <path
        fill="none"
        style={{
          transform:
            'scale(0.284583, 0.284583) translate(-1px, -3px)',
        }}
        d="m 11.926664,1.1161165 c 5.50133,9.5176855 9.663162,25.9796645 9.66318,42.6065395 m 0,0 c 1.62e-4,18.330222 -4.950245,36.216284 -11.386335,45.249616"
      />
      <g transform="scale(0.26458333)">
        <path
          d="m 12.810547,2 c 5.50133,9.517685 8.779279,25.095781 8.779297,41.722656 C 21.590006,62.052878 17.611871,78.966668 11.175781,88 H 37.875 c 23.748245,0 43.005576,-42.349157 43,-43 -0.0058,-0.677686 -19.251755,-43 -43,-43 h -0.271484 z"
          transform="translate(7)"
        />
        <circle r="5.72056" cy="45" cx="94.27944" />
      </g>
    </g>
    <g
      transform={` rotate(${orientation*90} 12 12) translate(${translation})`}
      strokeWidth={portWidth}
      stroke={portColor}
    >
      <g transform="scale(0.26458333)">
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
    </g>
  </svg>
);

const XnorWidget = props => {
  const { model } = props;

  const inputPorts = Object.values(model.getInputPorts());
  const portPositions = distributePorts(inputPorts.length);

  const portWidth = inputPorts[0].getLineWidth();
  const portColor = inputPorts[0].getLineColor();

  const orientation = model.orientation;
  const inputEdges = ['top', 'left', 'top', 'left'];
  const inputSides = ['right', 'bottom', 'left', 'top'];
  const outputSides = ['left', 'top', 'right', 'bottom'];

  const dWidths = [15, 0]
  const dHeights = [0, 15]
  const vbWidths = [27.781249, 23.812501]
  const vbHeights = [23.812501, 27.781249]
  const translations = [0, 0, -4, -4]

  return (
    <Wrapper
      selected={model.options.selected}
      width={90 + dWidths[orientation % 2]}
      height={90 + dHeights[orientation % 2]}
    >
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
              edge={inputEdges[orientation]}
              side={inputSides[orientation]}
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
        dWidth={dWidths[orientation % 2]}
        dHeight={dHeights[orientation % 2]}
        vbWidth={vbWidths[orientation % 2]}
        vbHeight={vbHeights[orientation % 2]}
        orientation={orientation}
        translation={translations[orientation]}
        portWidth={portWidth}
        portColor={portColor}
      />
    </Wrapper>
  );
};

export default XnorWidget;
