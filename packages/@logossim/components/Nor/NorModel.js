import { BaseModel } from '@logossim/core';

export default class NorModel extends BaseModel {
  initialize(configurations) {
    const INPUT_PORTS_NUMBER = parseInt(
      configurations.INPUT_PORTS_NUMBER,
      10,
    );
    const DATA_BITS = parseInt(configurations.DATA_BITS, 10);

    for (let i = 0; i < INPUT_PORTS_NUMBER; i += 1) {
      this.addInputPort(`in${i}`, DATA_BITS);
    }
    this.addOutputPort('out', DATA_BITS);
  }

  step(input) {
    return {
      out: ~Object.values(input).reduce((acc, curr) => acc | curr),
    };
  }
}
