import React from 'react';

import { Port } from '@logossim/core';

import styled from 'styled-components';

const SHAPE_SIZES = {
  1: { width: 30, height: 30 },
  2: { width: 60, height: 30 },
  4: { width: 120, height: 30 },
  8: { width: 120, height: 60 },
  16: { width: 240, height: 60 },
};

const PIN_BACKGROUND = {
  0: 'var(--value-off)',
  1: 'var(--value-on)',
  x: 'var(--value-floating)',
  e: 'var(--value-error)',
};

const PIN_BORDER = {
  0: 'var(--value-on)',
  1: 'var(--value-off)',
  x: 'black',
  e: 'black',
};

const PositionedPort = styled(Port)`
  position: absolute;
  ${props => `${props.side}: ${props.position-2}px`};
`;

export const Shape = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: ${props => {
    if (props.format === 'BITS')
      return SHAPE_SIZES[props.dataBits].width;

    return SHAPE_SIZES[4].width;
  }}px;
  height: ${props => {
    if (props.format === 'BITS')
      return SHAPE_SIZES[props.dataBits].height;

    return SHAPE_SIZES[4].height;
  }}px;

  background: ${props =>
    props.selected
      ? 'var(--output-body-selected)'
      : 'var(--output-body-unselected)'};
  border: 2px solid
    ${props =>
      props.selected
        ? 'var(--border-selected)'
        : 'var(--border-unselected)'};
  border-radius: 20px;
`;

export const PinContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  font-family: monospace;

  max-width: 215px;
`;

export const Pin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
  margin: 2px;

  background: ${props => PIN_BACKGROUND[props.value]};
  border: 2px solid ${props => PIN_BORDER[props.value]};
  border-radius: 100%;

  color: ${props => (props.value === 1 ? 'black' : 'white')};
  font-family: monospace;

  transition: 100ms linear;
`;

const ErrorMessage = styled.span`
  color: var(--value-error);
  font-weight: bold;
  font-family: monospace;
`;

const FloatingMessage = styled.span`
  color: var(--value-floating);
  font-weight: bold;
  font-family: monospace;
`;

const mapBits = model => {
  const {
    configurations: { DATA_BITS },
  } = model;
  const dataBits = Number(DATA_BITS);

  return [...new Array(dataBits)].map((_, index) => {
    const value = model.getBitAt(index);

    return (
      <Pin
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        value={value}
      >
        {value}
      </Pin>
    );
  });
};

const showAsNumber = (input, format) => {
  const number = input.asNumber();
  if (number === 'e') return <ErrorMessage>(error)</ErrorMessage>;
  if (number === 'x')
    return <FloatingMessage>(floating)</FloatingMessage>;

  if (format === 'DECIMAL') return number;
  if (format === 'HEXADECIMAL')
    return `0x${number.toString(16).padStart(4, '0')}`;
  return '';
};

const OutputWidget = props => {
  const { model } = props;
  const {
    options: { selected },
    configurations: { OUTPUT_FORMAT, DATA_BITS },
  } = model;

  const dataBits = Number(DATA_BITS);

  const orientation = model.orientation;
  const inputSides = ['right', 'bottom', 'left', 'top'];

  const width = (OUTPUT_FORMAT === 'BITS') ? SHAPE_SIZES[dataBits].width : SHAPE_SIZES[4].width;
  const height = (OUTPUT_FORMAT === 'BITS') ? SHAPE_SIZES[dataBits].height : SHAPE_SIZES[4].height;
  const positions = [width, height, width, height];

  return (
    <Shape
      selected={selected}
      format={OUTPUT_FORMAT}
      dataBits={dataBits}
    >
      <PinContainer data-testid="pin-container">
        {OUTPUT_FORMAT === 'BITS'
          ? mapBits(model)
          : showAsNumber(model.getInput(), OUTPUT_FORMAT)}
      </PinContainer>
      <PositionedPort
        name="in"
        side={inputSides[orientation]}
        position={positions[orientation]}
      />
    </Shape>
  );
};

export default OutputWidget;
