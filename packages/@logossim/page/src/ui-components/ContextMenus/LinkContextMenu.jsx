import React from 'react';
import { Menu, Item } from 'react-contexify';

import {
  Probe,
} from '../Icons';
import ContextMenuIconContainer from './ContextMenuIconContainer';

const LinkContextMenu = ({
  recordSelected,
}) => (
  <Menu id="link">
    <Item onClick={recordSelected}>
      <ContextMenuIconContainer>
        <Probe />
      </ContextMenuIconContainer>
      Record
    </Item>
  </Menu>
);

export default LinkContextMenu;
