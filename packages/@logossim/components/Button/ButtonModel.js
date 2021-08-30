import { BaseModel } from '@logossim/core';

export default class ButtonModel extends BaseModel {
  initialize(configurations) {
    this.canRotate = true;
    this.orientation = configurations.ORIENTATION;

    this.addOutputPort('out', { orientation: this.orientation, offset: 0, length: 10 });
  }

  onSimulationStart() {
    this.emit({ out: 0 });
  }

  onClick() {
    this.emit({ out: 1 });
  }

  onRelease() {
    this.emit({ out: 0 });
  }
}
