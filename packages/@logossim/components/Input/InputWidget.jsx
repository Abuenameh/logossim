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
};

const PIN_BORDER = {
  0: 'var(--value-on)',
  1: 'var(--value-off)',
  x: 'black',
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
  
  width: ${props => SHAPE_SIZES[props.dataBits].width}px;
  height: ${props => SHAPE_SIZES[props.dataBits].height}px;

  background: ${props =>
    props.selected
      ? 'var(--input-body-selected)'
      : 'var(--input-body-unselected)'};
  border: 2px solid
    ${props =>
      props.selected
        ? 'var(--border-selected)'
        : 'var(--border-unselected)'};
  border-radius: 20px;
`;

export const PinContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  max-width: 215px;
`;

export const Pin = styled.button`
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

const InputWidget = props => {
  const { model } = props;
  const {
    options: { selected },
    configurations: { DATA_BITS },
  } = model;

  const dataBits = Number(DATA_BITS);

  const orientation = model.orientation;
  const outputSides = ['left', 'top', 'right', 'bottom'];

  const size = SHAPE_SIZES[dataBits];
  const positions = [size.width, size.height, size.width, size.height];

  return (
    <Shape selected={selected} dataBits={dataBits}>
      <PinContainer>
        {[...new Array(dataBits)].map((_, index) => {
          const value = model.getBitAt(index);

          return (
            <Pin
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => model.onClick(index)}
              value={value}
            >
              {value}
            </Pin>
          );
        })}
      </PinContainer>
      <PositionedPort
        name="out"
        side={outputSides[orientation]}
        position={positions[orientation]}
      />
    </Shape>
  );
};

export default InputWidget;
