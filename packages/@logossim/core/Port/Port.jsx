import React, { useContext } from 'react';

import { PortWidget } from '@projectstorm/react-diagrams';

import styled from 'styled-components';

import ComponentContext from '../ComponentContext';
import DiagramContext from '../Diagram/DiagramContext';

const Wire = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  margin-${props => props.marginSide}: ${props => props.length}px;
  border: var(--port-width) solid
    ${props =>
      props.link
        ? 'var(--port-connected-border)'
        : 'var(--port-unconnected-border)'};
  border-radius: 100%;
  background: ${props => props.port.getColor()};

  &:hover {
    background: var(--port-hover);
  }
`;

class Port extends PortWidget {
  report() {
    if (this.props.port) super.report();
  }

  componentDidUpdate() {
    if (this.props.port) super.componentDidUpdate();
  }

  render() {
    const { name, port, model, className = '' } = this.props;

    if (!port) return null;

    const marginSides = ['left', 'top', 'right', 'bottom'];
    const orientation = port.getOrientation()
    const width = port.getLineWidth();
    const length = port.getLength() + port.getOffset();
    const widths = [length, 10, length, 10];
    const heights = [10, length, 10, length];
    const x1s = [0, 5, 0, 5]
    const x2s = [length, 5, length, 5]
    const y1s = [5, 0, 5, 0]
    const y2s = [5, length, 5, length]

    return (
      <>
        <Circle
          className={`port ${className}`}
          data-name={name}
          data-nodeid={model.getID()}
          port={port}
          link={port.getMainLink()}
          title={name}
          marginSide={marginSides[orientation]}
          length={length}
        />
        <Wire
          className={`port ${className}`}
          width={widths[orientation]}
          height={heights[orientation]}
        >
          <svg
            height={heights[orientation]}
            width={widths[orientation]}
            style={{display: "block"}}
          >
            <g>
              <line
                x1={x1s[orientation]}
                y1={y1s[orientation]}
                x2={x2s[orientation]}
                y2={y2s[orientation]}
                stroke={port.getLineColor()}
                strokeWidth={width}
              />
            </g>
          </svg>
         </Wire>
      </>
    );
  }
}

/**
 * React Diagrams PortWidget implementation needs us to forward some
 * props in order to function properly. We have this HOC so that
 * component widgets don't need to pass them every time.
 */
const withProps = WrappedComponent => ({ ...props }) => {
  const diagram = useContext(DiagramContext);
  const model = useContext(ComponentContext);

  return (
    <WrappedComponent
      {...props}
      port={model.getPort(props.name)}
      engine={diagram.getEngine()}
      model={model}
    />
  );
};

export default withProps(Port);
