import React from 'react';
import { contextMenu } from 'react-contexify';

import { CanvasWidget } from '@projectstorm/react-canvas-core';

import styled from 'styled-components';

import DiagramContext from './DiagramContext';
import DroppableLayer from './DroppableLayer';

const FullscreenCanvas = styled(CanvasWidget)`
  height: 100%;
  width: 100%;
`;

function showMenu(e) {
  contextMenu.show({id: "diagram", event: e, props: {test: 1}})
}

const Diagram = ({ engine }) => (
  <div onContextMenu={showMenu}>
    <DroppableLayer
      handleComponentDrop={(...args) =>
        engine.handleComponentDrop(...args)
      }
      disabled={engine.isLocked()}
    >
      <DiagramContext.Provider value={engine}>
        <FullscreenCanvas engine={engine.getEngine()} />
      </DiagramContext.Provider>
    </DroppableLayer>
    </div>
);

export default Diagram;
