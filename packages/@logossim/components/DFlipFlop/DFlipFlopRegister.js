import { Component } from '@logossim/core';

import icon from './DFlipFlopIcon';
import model from './DFlipFlopModel';
import widget from './DFlipFlopWidget';

export default new Component({
  type: 'DFlipFlop',
  name: 'D flip-flop',
  description: 'D flip-flop',
  group: 'Flip-flops',
  configurations: [
    {
      name: 'TRIGGER_ON',
      type: 'select',
      default: 'rising',
      label: 'Trigger on',
      options: [
        {
          label: 'Rising edge',
          value: 'rising',
        },
        {
          label: 'Falling edge',
          value: 'falling',
        },
      ],
    },
  ],
  model,
  widget,
  icon,
});

