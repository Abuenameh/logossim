import React from 'react';

import { Wrapper, Shape, PositionedChevron } from './JKFlipFlopWidget';

import styled from 'styled-components';

const PositionedLabel = styled.div`
  position: absolute;
  top: ${props => props.position}px;
  ${props => `${props.side}: 1px;`}
  font-size: 0.75em;
  transform: translateY(-50%);
  text-decoration: ${props => props.complemented ? 'overline' : 'none'};
`;

const JKFlipFlopIcon = () => (
  <Wrapper icon>
    <Shape icon/>
    <PositionedChevron icon/>
    <PositionedLabel
      position="6"
      side="left"
      complemented={false}
    >
      J
    </PositionedLabel>
    <PositionedLabel
      position="26"
      side="left"
      complemented={false}
    >
      K
    </PositionedLabel>
    <PositionedLabel
      position="6"
      side="right"
      complemented={false}
    >
      Q
    </PositionedLabel>
    <PositionedLabel
      position="26"
      side="right"
      complemented={true}
    >
      Q
    </PositionedLabel>
  </Wrapper>
);

export default JKFlipFlopIcon;
