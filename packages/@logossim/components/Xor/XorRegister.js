import { Component } from '@logossim/core';

import icon from './XorIcon';
import model from './XorModel';
import widget from './XorWidget';

export default new Component({
  type: 'Xor',
  name: 'Xor',
  description: 'Logic "exclusive or" gate',
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
      name: 'MULTIPLE_INPUT_BEHAVIOR',
      type: 'select',
      default: 'ONE',
      label: 'Multiple input behavior',
      options: [
        {
          label: 'Detect when only one input is on',
          value: 'ONE',
        },
        {
          label: 'Detect when an odd number of inputs are on',
          value: 'ODD',
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
