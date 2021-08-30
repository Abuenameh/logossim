import { BaseModel } from '@logossim/core';

export default class BufferModel extends BaseModel {
  initialize(configurations) {
    const DATA_BITS = Number(configurations.DATA_BITS);

    this.canRotate = true;
    this.orientation = configurations.ORIENTATION;

    this.addInputPort('in', { bits: DATA_BITS, orientation: (this.orientation + 2) % 4, offset: 1, length: 10 });
    this.addOutputPort('out', { bits: DATA_BITS, orientation: this.orientation, offset: 1, length: 10 });
  }

  step(input) {
    return { out: input.in };
  }
}
