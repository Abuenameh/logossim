import { Component } from '@logossim/core';

import icon from './TFlipFlopIcon';
import model from './TFlipFlopModel';
import widget from './TFlipFlopWidget';

export default new Component({
  type: 'TFlipFlop',
  name: 'T flip-flop',
  description: 'T flip-flop',
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

