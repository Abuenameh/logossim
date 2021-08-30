import { BaseModel } from '@logossim/core';

export default class OutputModel extends BaseModel {
  initialize(configurations) {
    this.dataBits = Number(configurations.DATA_BITS);

    this.canRotate = true;
    this.orientation = configurations.ORIENTATION;

    this.addInputPort('in', { bits: this.dataBits, orientation: (this.orientation + 2) % 4, offset: 0, length: 10 });
  }

  getInput() {
    return (
      this.getPort('in').getValue() ||
      new Array(this.dataBits).fill(0)
    );
  }

  getBitAt(index) {
    return this.getInput()[index];
  }
}
