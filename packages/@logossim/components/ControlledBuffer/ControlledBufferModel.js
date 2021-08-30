import { BaseModel } from '@logossim/core';

export default class ControlledBufferModel extends BaseModel {
  initialize(configurations) {
    const DATA_BITS = Number(configurations.DATA_BITS);

    this.canRotate = true;
    this.orientation = configurations.ORIENTATION;

    this.addInputPort('control', { orientation: (this.orientation + 1) % 4, offset: 0, length: 10 });
    this.addInputPort('in', { bits: DATA_BITS, orientation: (this.orientation + 2) % 4, offset: 0, length: 10 });
    this.addOutputPort('out', { bits: DATA_BITS, orientation: this.orientation, offset: 0, length: 10 });
  }

  step(input) {
    if (input.control === 0) return { out: 'x' };
    return { out: input.in };
  }

  stepFloating(input) {
    if (input.control[0] === 'x') return { out: 'e' };
    if (input.control[0] === 0) return { out: 'x' };
    return { out: input.in };
  }

  stepError(input) {
    return this.stepFloating(input);
  }
}
