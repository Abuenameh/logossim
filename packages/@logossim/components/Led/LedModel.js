import { BaseModel } from '@logossim/core';

export default class LedModel extends BaseModel {
  initialize(configurations) {
    this.activeWhen = configurations.ACTIVE_WHEN;
    this.colors = {
      on: configurations.ON_COLOR,
      off: configurations.OFF_COLOR,
    };

    this.addInputPort('in');
  }

  getInput() {
    const value = this.getPort('in').getValue();

    if (!value) return 0;
    return value[0];
  }

  isActive() {
    const input = this.getInput();

    if (this.activeWhen === 'HIGH') {
      if (input === 0) return false;
      return true;
    }

    if (input === 0) return true;
    return false;
  }

  getColor() {
    if (this.isActive()) return this.colors.on;
    return this.colors.off;
  }
}
