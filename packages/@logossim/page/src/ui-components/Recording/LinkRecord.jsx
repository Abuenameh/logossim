export default class LinkRecord {
  constructor(link, name) {
    this.link = link;
    this.name = name;
    this.recording = [];
  }

  record() {
    this.recording.push(this.link.getValue());
  }

  clear() {
    this.recording = [];
  }

  getID() {
    return this.link.getID();
  }

  getName() {
    return this.name;
  }

  hasValue() {
    return this.link.getValue() ? true : false;
  }

  getValue() {
    return this.link.getValue();
  }

  getRecording() {
    return this.recording;
  }
}