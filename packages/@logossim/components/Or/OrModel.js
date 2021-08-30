import { BaseModel } from '@logossim/core';

export default class OrModel extends BaseModel {
  initialize(configurations) {
    const INPUT_PORTS_NUMBER = Number(
      configurations.INPUT_PORTS_NUMBER,
    );
    this.dataBits = Number(configurations.DATA_BITS);

    this.canRotate = true;
    this.orientation = configurations.ORIENTATION;

    for (let i = 0; i < INPUT_PORTS_NUMBER; i += 1) {
      this.addInputPort(`in${i}`, { bits: this.dataBits, orientation: (this.orientation + 2) % 4, offset: 2, length: -5 });
    }
    this.addOutputPort('out', { bits: this.dataBits, orientation: this.orientation, offset: 2, length: 10 });
  }

  executeBit(bits) {
    if (bits.every(bit => bit === 0)) return 0;
    if (bits.some(bit => bit === 1)) return 1;
    return 'e';
  }

  step(input) {
    return {
      out: Object.values(input)
        .map(value => value.asArray(this.dataBits))
        .transpose()
        .map(this.executeBit),
    };
  }

  stepFloating(input) {
    return this.step(input);
  }

  stepError(input) {
    return this.step(input);
  }
}
