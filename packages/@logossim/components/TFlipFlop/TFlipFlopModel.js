import { BaseModel } from '@logossim/core';

export default class TFlipFlopModel extends BaseModel {
  initialize(configurations) {
    const DATA_BITS = Number(configurations.DATA_BITS);

    this.initialized = false;

    this.triggerOnRising = configurations.TRIGGER_ON === 'rising';

    this.addInputPort('T', { bits: 1, floating: 0, orientation: 2, offset: 0, length: 25 });
    this.addInputPort('Clock', { bits: 1, floating: 0, orientation: 2, offset: 0, length: 25, complemented: configurations.TRIGGER_ON == 'falling' });
    this.addInputPort('Clear', { bits: 1, floating: 1, orientation: 2, offset: 0, length: 25, complemented: true });
    this.addOutputPort('Q', { bits: 1, orientation: 0, offset: 0, length: 25 });
    this.addOutputPort('Qbar', { bits: 1, orientation: 0, offset: 0, length: 25, complemented: true  });
  }

  getPortInfo(port) {
    const PORT_INFO = {
      T: {
        side: 'right',
        position: 1,
        label: 'T',
        labelSide: 'left',
        labelOffset: 0,
        complemented: false,
      },
      Clock: {
        side: 'right',
        position: 2,
        label: 'CLK',
        labelSide: 'left',
        labelOffset: 10,
        complemented: !this.triggerOnRising,
      },
      Clear: {
        side: 'right',
        position: 3,
        label: 'CLR',
        labelSide: 'left',
        labelOffset: 0,
        complemented: true,
      },
      Q: {
        side: 'left',
        position: 1,
        label: 'Q',
        labelSide: 'right',
        labelOffset: 0,
        complemented: false,
      },
      Qbar: {
        side: 'left',
        position: 3,
        label: 'Q',
        labelSide: 'right',
        labelOffset: 0,
        complemented: true,
      },
    }

    return PORT_INFO[port];
  }

  getPositionForPort(port) {
    return 8 + 30 * (this.getPortInfo(port).position - 1);
  }

  getSideForPort(port) {
    return this.getPortInfo(port).side;
  }

  getLabelForPort(port) {
    return this.getPortInfo(port).label;
  }

  getSideForPortLabel(port) {
    return this.getPortInfo(port).labelSide;
  }

  getPortLabelOffset(port) {
    return this.getPortInfo(port).labelOffset;
  }

  isPortComplemented(port) {
    return this.getPortInfo(port).complemented;
  }

  isRisingEdge(meta) {
    if (this.triggerOnRising) return meta.Clock.risingEdge;
    return meta.Clock.fallingEdge;
  }

  step(input, meta) {
    if (!this.initialized) {
      const initialValues = { Q: 0, Qbar: 1 };
      this.ports['output'] = this.ports['output'].map(port => {
        return {
          ...port,
          value: [initialValues[port.name]]
        };
      });
      this.emit({ Q: 0, Qbar: 1 });
      this.initialized = true;
    }
    const Q = this.getPort('Q').getValue();
    const Qbar = this.getPort('Qbar').getValue();
    if (!input.Clear) {
      return {
        Q: 0,
        Qbar: 1,
      };
    }
    if (this.isRisingEdge(meta)) {
      const newQ = input.T ? ~Q : Q;
      this.emit({ Q: newQ, Qbar: ~newQ });
      return;
    }
  }

  stepError(input, meta) {
    if (!this.initialized) {
      const initialValues = { Q: 0, Qbar: 1 };
      this.ports['output'] = this.ports['output'].map(port => {
        return {
          ...port,
          value: [initialValues[port.name]]
        }
      });
      this.emit({ Q: 0, Qbar: 1 })
      this.initialized = true;
    }
    if (this.isRisingEdge(meta)) {
      return {
        Q: 'e',
        Qbar: 'e',
      };
    }
  }
}
