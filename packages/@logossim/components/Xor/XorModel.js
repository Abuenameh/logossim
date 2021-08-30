import { BaseModel } from '@logossim/core';

export default class XorModel extends BaseModel {
  initialize(configurations) {
    this.behavior = configurations.MULTIPLE_INPUT_BEHAVIOR;
    this.dataBits = Number(configurations.DATA_BITS);

    this.canRotate = true;
    this.orientation = configurations.ORIENTATION;

    const INPUT_PORTS_NUMBER = Number(
      configurations.INPUT_PORTS_NUMBER,
    );

    for (let i = 0; i < INPUT_PORTS_NUMBER; i += 1) {
      this.addInputPort(`in${i}`, { bits: this.dataBits, orientation: (this.orientation + 2) % 4, offset: 2, length: -5 });
    }
    this.addOutputPort('out', { bits: this.dataBits, orientation: this.orientation, offset: 2, length: 10 });
  }

  executeBit(bits) {
    if (bits.some(bit => bit === 'x' || bit === 'e')) return 'e';
    if (this.behavior === 'ONE') return this.executeOne(bits);
    if (this.behavior === 'ODD') return this.executeOdd(bits);
    return {};
  }

  executeOne(bits) {
    return bits.filter(bit => bit === 1).length === 1 ? 1 : 0;
  }

  executeOdd(bits) {
    return bits.filter(bit => bit === 1).length % 2 ? 1 : 0;
  }

  step(input) {
    return {
      out: Object.values(input)
        .map(value => value.asArray(this.dataBits))
        .transpose()
        .map(this.executeBit.bind(this)),
    };
  }

  stepFloating(input) {
    return this.step(input);
  }
}
