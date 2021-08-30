import { BaseModel } from '@logossim/core';

export default class NotModel extends BaseModel {
  initialize(configurations) {
    this.dataBits = Number(configurations.DATA_BITS);

    this.canRotate = true;
    this.orientation = configurations.ORIENTATION;

    this.addInputPort('in', { bits: this.dataBits, orientation: (this.orientation + 2) % 4, offset: 0, length: 10 });
    this.addOutputPort('out', { bits: this.dataBits, orientation: this.orientation, offset: 2, length: 14 });
  }

  step(input) {
    return {
      out: input.in.asArray(this.dataBits).map(bit => {
        if (bit === 1) return 0;
        return 1;
      }),
    };
  }
}
