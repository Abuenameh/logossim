import { BaseModel } from '@logossim/core';

export default class BuzzerModel extends BaseModel {
  initialize(configurations) {
    this.frequencyHz = Number(configurations.FREQUENCY_HZ);
    this.waveform = configurations.WAVEFORM;

    this.canRotate = true;
    this.orientation = configurations.ORIENTATION;

    this.addInputPort('in', { orientation: (this.orientation + 2) % 4, offset: 0, length: 10 });
  }

  onSimulationStart() {
    this.audio = this.createAudio(this.frequencyHz, this.waveform);

    if (this.getInput() === 1) this.audio.play();
  }

  onSimulationPause() {
    this.audio.pause();
  }

  step(input) {
    if (input.in) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  getInput() {
    const value = this.getPort('in').getValue();

    if (!value) return 0;
    return value[0];
  }

  isActive() {
    return !!this.getInput();
  }
}
