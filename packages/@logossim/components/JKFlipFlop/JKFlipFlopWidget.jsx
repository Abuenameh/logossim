import React from 'react';

import { Port } from '@logossim/core';

import styled from 'styled-components';

const PORTS = ['J', 'Clock', 'K', 'Clear', 'Q', 'Qbar'];

const Chevron = ({ className, selected, icon }) => (
  <svg
    className={className}
    width={icon ? 6 : 12}
    height={icon ? 12 : 20}
    stroke={`var(--border-${selected ? '' : 'un'}selected)`}
    strokeWidth={2}
    strokeLinecap="round"
  >
    <line x1={0} y1={0} x2={icon ? 6 : 12} y2={icon ? 6 : 10} />
    <line x1={icon ? 6 : 12} y1={icon ? 6 : 10} x2={0} y2={icon ? 12 : 20} />
  </svg>
);

export const PositionedChevron = styled(Chevron)`
  position: absolute;
  left: -1px;
  top: ${props => props.icon ? 10 : 33}px;

  transition: 100ms linear;
`;

const PositionedPort = styled(Port)`
  position: absolute;
  top: ${props => props.position}px;
  ${props => `${props.side}: ${(props.icon ? 28 : 90) - 2}px;`}
`;

const PositionedLabel = styled.div`
  position: absolute;
  top: ${props => props.position+5}px;
  ${props => `${props.side}: ${props.offset+5}px;`}
  font-size: 0.75em;
  transform: translateY(-50%);
  text-decoration: ${props => props.complemented ? 'overline' : 'none'};
`;

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: ${props => (props.icon ? 28 : 90)}px;
  height: ${props => (props.icon ? 36 : 120)}px;

  background: ${props => `#ffffff${props.selected ? '80' : 'ff'}`};
  box-shadow: 0 0 ${props => (props.isActive ? 15 : 0)}px
    ${props => props.color};
  border: 2px solid
    ${props =>
      props.selected
        ? 'var(--border-selected)'
        : 'var(--border-unselected)'};
  border-radius: 5px;

  transition: 100ms linear;
`;

export const Shape = ({ selected, icon }) => (
  <svg
    width={icon ? 28 : 90}
    height={icon ? 36 : 120}
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      opacity: selected ? '80' : 'ff',
      fillOpacity: selected ? '80' : 'ff',
    }}
  >
  </svg>
);

const JKFlipFlopWidget = props => {
  const { model } = props;
  const {
    options: { selected },
  } = model;

  return (
    <Wrapper selected={selected}>
      <Shape/>
      <PositionedChevron selected={selected} />
      {PORTS.map(port => (
        <PositionedPort
          key={port}
          name={port}
          position={model.getPositionForPort(port)}
          side={model.getSideForPort(port)}
        />
      ))}
      {PORTS.map(port => (
        <PositionedLabel
          key={`${port}Label`}
          position={model.getPositionForPort(port)}
          side={model.getSideForPortLabel(port)}
          label={model.getLabelForPort(port)}
          offset={model.getPortLabelOffset(port)}
          complemented={model.isPortComplemented(port)}
        >
         {model.getLabelForPort(port)}
        </PositionedLabel>
      ))}
    </Wrapper>
  );
};

export default JKFlipFlopWidget;
