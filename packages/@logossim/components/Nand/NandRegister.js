import { Component } from '@logossim/core';

import icon from './NandIcon';
import model from './NandModel';
import widget from './NandWidget';

export default new Component({
  type: 'Nand',
  name: 'Nand',
  description: 'Logic "not and" gate',
  group: 'Logic gates',
  configurations: [
    {
      name: 'INPUT_PORTS_NUMBER',
      type: 'number',
      default: 2,
      label: 'Number of input ports',
      min: 2,
      max: 5,
      validate(value) {
        if (value < this.min)
          return `Minimum input ports is ${this.min}`;
        if (value > this.max)
          return `Maximum input ports is ${this.max}`;
        return null;
      },
    },
    {
      name: 'DATA_BITS',
      type: 'select',
      default: '1',
      label: 'Data bits',
      options: [
        {
          label: '1 bit',
          value: '1',
        },
        {
          label: '2 bits',
          value: '2',
        },
        {
          label: '4 bits',
          value: '4',
        },
        {
          label: '8 bits',
          value: '8',
        },
        {
          label: '16 bits',
          value: '16',
        },
      ],
    },
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
