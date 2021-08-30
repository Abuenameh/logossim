import { Component } from '@logossim/core';

import icon from './SwitchIcon';
import model from './SwitchModel';
import widget from './SwitchWidget';

export default new Component({
  type: 'Switch',
  name: 'Switch',
  description: 'On/off switch',
  group: 'Input & output',
  configurations: [
    {
      name: 'ORIENTATION',
      type: 'hidden',
      default: 0,
      label: 'Orientation of component',
    },
  ],
  model,
  widget,
  icon,
});
