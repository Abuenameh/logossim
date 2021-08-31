import { Component } from '@logossim/core';

import icon from './JKFlipFlopIcon';
import model from './JKFlipFlopModel';
import widget from './JKFlipFlopWidget';

export default new Component({
  type: 'JKFlipFlop',
  name: 'JK Flip-Flop',
  description: 'JK Flip-Flop',
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

