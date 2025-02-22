import React, { Component } from 'react';
import Tooltip from 'react-tooltip';

import components, { groupedComponents } from '@logossim/components';
import {
  SimulationEngine,
  DiagramEngine,
  Diagram,
} from '@logossim/core';

import FileSaver from 'file-saver';

import {
  Titlebar,
  SimulationControlButtons,
  ComponentSelectButton,
  ShowOscilloscopeButton,
  ComponentSelect,
  ComponentEdit,
  ContextMenus,
  HelpKeyboardShortcuts,
  LoadingExample,
  HelpAbout,
  Snackbar,
  Tour,
  RecordSelected,
  LinkRecord,
  ShowOscilloscope,
} from './ui-components';
import tourCircuit, {
  DIMENSIONS,
} from './ui-components/Tour/tourCircuit';

import './App.css';

const DEFAULT_CIRCUIT_NAME = 'Untitled circuit';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isComponentSelectOpen: false,
      isComponentEditOpen: false,
      isHelpKeyboardOpen: false,
      isHelpAboutOpen: false,
      isNameRecordingOpen: false,
      isOscilloscopeOpen: false,
      componentEdit: null,
      linkName: null,
      isTourAvailable: false,
      isTourRunning: !JSON.parse(localStorage.getItem('tour-done')),
      circuitName: DEFAULT_CIRCUIT_NAME,
      circuitCreatedAt: null,
      isCircuitNameFocused: false,
      isLoadingExample: false,
      snackbar: {
        open: false,
        message: '',
        type: 'success',
        timeout: 0,
        timeoutID: null,
      },
    };

    this.diagram = new DiagramEngine(
      components,
      this.areShortcutsAllowed,
      this.showSnackbar,
    );
    this.simulation = new SimulationEngine(components);
    this.linkRecordings = [];
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const example = urlParams.get('example');

    if (example === null) {
      window.addEventListener('load', this.loadHandler);
    } else {
      this.loadExample(example);
    }

    window.addEventListener('keydown', this.shortcutHandler);
    window.addEventListener('beforeunload', this.unloadHandler);

    this.autoSaveInterval = setInterval(this.autoSave, 5000);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.shortcutHandler);
    window.addEventListener('load', this.loadHandler);
    window.removeEventListener('beforeunload', this.unloadHandler);

    clearInterval(this.autoSaveInterval);
  }

  areShortcutsAllowed = () => {
    const {
      isComponentSelectOpen,
      isComponentEditOpen,
      isHelpKeyboardOpen,
      isHelpAboutOpen,
      isNameRecordingOpen,
      isOscilloscopeOpen,
      isCircuitNameFocused,
      isTourRunning,
    } = this.state;

    return !(
      isComponentSelectOpen ||
      isComponentEditOpen ||
      isHelpKeyboardOpen ||
      isHelpAboutOpen ||
      isNameRecordingOpen ||
      isOscilloscopeOpen ||
      isCircuitNameFocused ||
      isTourRunning
    );
  };

  shortcutHandler = event => {
    const { ctrlKey, shiftKey, code } = event;

    if (!this.areShortcutsAllowed()) return;

    // Add component
    if (ctrlKey && code === 'KeyA') {
      event.preventDefault();
      if (!this.simulation.isStopped()) return;

      this.showAddComponent();
    }

    // Component configuration
    if (ctrlKey && code === 'KeyE') {
      event.preventDefault();
      if (!this.simulation.isStopped()) return;

      const selectedNodes = this.diagram.getSelectedNodes();
      if (selectedNodes.length !== 1) return;
      const node = selectedNodes[0];
      this.showEditComponent(node);
    }

    // Play/pause toggle simulation
    if (!ctrlKey && code === 'Space') {
      event.preventDefault();
      if (this.simulation.isRunning()) this.handleClickPause();
      else this.handleClickStart();
    }

    // Stop simulation
    if ((ctrlKey && code === 'Space') || code === 'Escape') {
      event.preventDefault();

      if (!this.simulation.isStopped()) this.handleClickStop();
    }

    // Save circuit
    if (ctrlKey && !shiftKey && code === 'KeyS') {
      event.preventDefault();
      this.handleClickSave();
    }

    // Load circuit
    if (
      (ctrlKey && code === 'KeyL') ||
      (ctrlKey && shiftKey && code === 'KeyS')
    ) {
      event.preventDefault();
      this.handleClickLoad();
    }
  };

  isCircuitEmpty = circuit => {
    if (!circuit) return true;

    return Object.keys(circuit.layers[1].models).length === 0;
  };

  loadFile = file => {
    this.setState({
      circuitName: file.name,
      circuitCreatedAt: file.createdAt,
    });
    this.diagram.load(file.circuit);
  };

  loadExample = async name => {
    this.setState({ isLoadingExample: true });
    const response = await window.fetch(`./examples/${name}.lgsim`);
    const circuit = await response.json();
    this.loadFile(circuit);
    this.setState({ isLoadingExample: false });
  };

  loadHandler = () => {
    const lastSaved = JSON.parse(
      localStorage.getItem('circuit-autosave'),
    );

    if (this.isCircuitEmpty(lastSaved?.circuit)) {
      this.setState({ isTourAvailable: true });
      return;
    }

    // eslint-disable-next-line no-alert
    const reload = window.confirm('Reload last unsaved circuit?');
    if (reload) {
      this.loadFile(lastSaved);
    } else {
      this.setState({ isTourAvailable: true });
      localStorage.removeItem('circuit-autosave');
    }
  };

  shouldWarnUnload = (currentCircuit, lastSavedCircuit) => {
    if (this.isCircuitEmpty(currentCircuit)) return false;

    return (
      JSON.stringify(lastSavedCircuit.layers) !==
      JSON.stringify(currentCircuit.layers)
    );
  };

  unloadHandler = event => {
    const lastSaved = JSON.parse(
      localStorage.getItem('last-saved-circuit'),
    );
    const file = this.generateFile();

    if (this.shouldWarnUnload(file.circuit, lastSaved.circuit)) {
      if (this.simulation.isStopped()) {
        localStorage.setItem(
          'circuit-autosave',
          JSON.stringify(file),
        );
      }
      // eslint-disable-next-line no-param-reassign
      event.returnValue =
        'You have unsaved changes. Sure you want to leave?';
    }
  };

  generateFile = () => {
    const { circuitName, circuitCreatedAt } = this.state;
    const circuit = this.diagram.serialize();

    return {
      id: circuit.id,
      name: circuitName,
      createdAt: circuitCreatedAt || new Date(),
      updatedAt: new Date(),
      circuit,
    };
  };

  autoSave = () => {
    const file = this.generateFile();

    if (file.circuit.id === 'tour-circuit') return;
    if (this.isCircuitEmpty(file.circuit)) return;
    if (!this.simulation.isStopped()) return;

    localStorage.setItem('circuit-autosave', JSON.stringify(file));
  };

  synchronizeSimulation = () => {
    const diff = this.simulation.getDiff();

    // Handles components diff
    Object.entries(diff.components).forEach(([id, componentDiff]) =>
      this.diagram.synchronizeComponent(id, componentDiff),
    );

    // Handles link value diff
    Object.entries(diff.links).forEach(([id, value]) =>
      this.diagram.synchronizeLink(id, value),
    );
    if (this.linkRecordings.some(linkRecord => Object.entries(diff.links).find(
      ([id]) => id === linkRecord.getID(),
    ))) {
      this.linkRecordings.forEach(linkRecord => linkRecord.record())
    }

    this.simulation.clearDiff();
    this.diagram.repaint();
  };

  renderSimulation = () => {
    if (!this.simulation.isRunning()) return;

    this.synchronizeSimulation();

    requestAnimationFrame(this.renderSimulation);
  };

  handleCircuitNameChange = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ circuitName: event.target.value });
  };

  handleCircuitNameFocus = event => {
    this.setState({ isCircuitNameFocused: true });
    if (event.target.value === DEFAULT_CIRCUIT_NAME)
      event.target.select();
  };

  handleCircuitNameBlur = () =>
    this.setState({ isCircuitNameFocused: false });

  handleClickSave = () => {
    const { circuitCreatedAt } = this.state;
    if (!circuitCreatedAt)
      this.setState({ circuitCreatedAt: new Date() });

    const file = JSON.stringify(this.generateFile(), null, 2);
    const blob = new Blob([file], {
      type: 'application/json',
    });

    const { circuitName } = this.state;
    const filename = circuitName.replace(/[/|\\:*?"<>]/g, '');
    localStorage.setItem('last-saved-circuit', file);

    FileSaver.saveAs(blob, `${filename}.lgsim`);
  };

  handleClickLoad = () =>
    document.getElementById('file-input').click();

  handleFileLoad = event => {
    const {
      target: { files },
    } = event;

    if (files.length !== 1) return;

    const handleError = () =>
      this.showSnackbar(
        `Error loading circuit file:\n${files[0].name}`,
      );

    const fr = new FileReader();
    fr.onerror = handleError;
    fr.onload = e => {
      try {
        const file = JSON.parse(e.target.result);
        this.loadFile(file);
      } catch (exception) {
        handleError();
      }
    };
    fr.readAsText(files.item(0));
  };

  handleClickStart = () => {
    const serialized = JSON.stringify(this.diagram.serialize());
    localStorage.setItem('circuit-autosave', serialized);

    this.diagram.clearSelection();
    this.diagram.setLocked(true);

    this.linkRecordings.forEach(linkRecord => linkRecord.clear())

    this.simulation.start(this.diagram.getModel());
    this.renderSimulation();
    this.forceUpdate();
  };

  handleClickPause = () => {
    this.simulation.pause();
    this.forceUpdate();
  };

  handleClickStop = async () => {
    await this.simulation.stop();
    this.diagram.clearAllValues();
    this.diagram.setLocked(false);
    this.forceUpdate();
    this.simulation.clearDiff();
  };

  showAddComponent = () =>
    this.setState({
      isComponentSelectOpen: true,
    });

  hideAddComponent = () =>
    this.setState({
      isComponentSelectOpen: false,
    });

  showEditComponent = componentEdit => {
    this.diagram.clearSelection();

    this.setState({
      isComponentEditOpen: true,
      componentEdit,
    });
  };

  hideEditComponent = () =>
    this.setState({
      isComponentEditOpen: false,
      componentEdit: null,
    });

  rotateComponentBy = (component, increment) => {
    if (!this.diagram.engine.getModel().isLocked() && component.canRotate) {
      const configurations = { ...component.configurations };
      configurations.ORIENTATION = (((configurations.ORIENTATION + increment) % 4) + 4) % 4;
      this.diagram.handleComponentEdit(component, configurations)
    }
  }

  rotateComponentLeft = component => this.rotateComponentBy(component, -1)

  rotateComponentRight = component => this.rotateComponentBy(component, 1)

  recordSelected = linkName => {
    this.diagram.clearSelection();

    this.setState({
      isNameRecordingOpen: true,
      linkName,
    });
  };

  hideNameRecording = () =>
    this.setState({
      isNameRecordingOpen: false,
      linkName: null,
    });

  handleLinkRecord = (link, name) => {
    const newLinkRecord = new LinkRecord(link, name)
    if (this.diagram.engine.getModel().isLocked()) {
      return;
    }
    if (this.linkRecordings.find(linkRecord => linkRecord.getID() === link.getID())) {
      alert(`This connection is already being recorded under the name "${this.linkRecordings.find(linkRecord => linkRecord.getID() === link.getID()).getName()}".`)
      return;
    }
    this.linkRecordings.push(newLinkRecord);
  }

  handleClearLinks = () => {
    this.linkRecordings = [];
    this.hideOscilloscope();
  }

  showOscilloscope = () => this.setState({ isOscilloscopeOpen: true });

  hideOscilloscope = () => this.setState({ isOscilloscopeOpen: false });

  setTourRunning = isTourRunning => this.setState({ isTourRunning });

  showHelpTour = () => this.setTourRunning(true);

  showHelpKeyboard = () =>
    this.setState({ isHelpKeyboardOpen: true });

  hideHelpKeyboard = () =>
    this.setState({ isHelpKeyboardOpen: false });

  showHelpAbout = () => this.setState({ isHelpAboutOpen: true });

  hideHelpAbout = () => this.setState({ isHelpAboutOpen: false });

  showSnackbar = async (message, type = 'error') => {
    const { snackbar } = this.state;
    const timeout = 3000 + message.split(' ').length * 50;

    if (snackbar.open) {
      clearTimeout(snackbar.timeoutID);
      this.hideSnackbar();
      await new Promise(res => setTimeout(res, 500));
    }

    this.setState({
      snackbar: {
        open: true,
        message,
        type,
        timeout,
        timeoutID: setTimeout(this.hideSnackbar, timeout),
      },
    });
  };

  hideSnackbar = () => {
    const { snackbar } = this.state;
    clearTimeout(snackbar.timeoutID);

    this.setState(state => ({
      snackbar: {
        ...state.snackbar,
        open: false,
      },
    }));
  };

  handleLoadTourCircuit = () => {
    this.circuitBeforeTour = this.generateFile();
    this.loadFile(tourCircuit);
    this.handleCenterTourCircuitOffset();
  };

  handleUnloadTourCircuit = () => {
    if (!this.circuitBeforeTour) return;

    this.loadFile(this.circuitBeforeTour);
    this.circuitBeforeTour = null;
  };

  handleCenterTourCircuitOffset = () => {
    this.diagram
      .getModel()
      .setOffset(
        (window.innerWidth - DIMENSIONS.width) / 2,
        (window.innerHeight - DIMENSIONS.height) / 2,
      );
    this.diagram.realignGrid();
    this.diagram.repaint();
  };

  render() {
    const {
      isComponentSelectOpen,
      isComponentEditOpen,
      isHelpKeyboardOpen,
      isHelpAboutOpen,
      isNameRecordingOpen,
      isOscilloscopeOpen,
      componentEdit,
      linkName,
      isTourAvailable,
      isTourRunning,
      circuitName,
      isCircuitNameFocused,
      isLoadingExample,
      snackbar,
    } = this.state;

    return (
      <>
        <Titlebar
          circuitName={circuitName}
          isCircuitNameFocused={isCircuitNameFocused}
          handleChangeCircuitName={this.handleCircuitNameChange}
          handleFocusCircuitName={this.handleCircuitNameFocus}
          handleBlurCircuitName={this.handleCircuitNameBlur}
          handleClickSave={this.handleClickSave}
          handleFileLoad={this.handleFileLoad}
          handleClickKeyboardShortcuts={this.showHelpKeyboard}
          handleClickRedoTour={this.showHelpTour}
          handleClickAbout={this.showHelpAbout}
          disabled={!this.simulation.isStopped()}
        />
        <SimulationControlButtons
          state={this.simulation.getState()}
          handleClickStart={this.handleClickStart}
          handleClickPause={this.handleClickPause}
          handleClickStop={this.handleClickStop}
        />
        <ComponentSelectButton
          handleClick={this.showAddComponent}
          disabled={!this.simulation.isStopped()}
        />
        <ShowOscilloscopeButton
          handleClick={this.showOscilloscope}
          disabled={!this.simulation.isStopped()}
        />

        <ComponentSelect
          isOpen={isComponentSelectOpen}
          groups={groupedComponents}
          handleClose={this.hideAddComponent}
          handleComponentDrop={this.diagram.handleComponentDrop}
        />
        <ComponentEdit
          isOpen={isComponentEditOpen}
          components={components}
          component={componentEdit}
          handleClose={this.hideEditComponent}
          handleComponentEdit={this.diagram.handleComponentEdit}
        />

        <HelpKeyboardShortcuts
          isOpen={isHelpKeyboardOpen}
          handleClose={this.hideHelpKeyboard}
        />
        <HelpAbout
          isOpen={isHelpAboutOpen}
          handleClose={this.hideHelpAbout}
        />
        {isTourAvailable && (
          <Tour
            run={isTourRunning}
            setTourRunning={this.setTourRunning}
            loadCircuit={this.handleLoadTourCircuit}
            clearCircuit={this.handleUnloadTourCircuit}
            recenterCircuit={this.handleCenterTourCircuitOffset}
          />
        )}

        {isLoadingExample && <LoadingExample />}
        <Diagram engine={this.diagram} />

        <ContextMenus
          duplicateSelected={this.diagram.duplicateSelected}
          cutSelected={this.diagram.cutSelected}
          copySelected={this.diagram.copySelected}
          pasteSelected={this.diagram.pasteSelected}
          deleteSelected={this.diagram.deleteSelected}
          undo={this.diagram.undo}
          redo={this.diagram.redo}
          zoomIn={this.diagram.zoomIn}
          zoomOut={this.diagram.zoomOut}
          rotateLeft={this.rotateComponentLeft}
          rotateRight={this.rotateComponentRight}
          configureComponent={this.showEditComponent}
          recordSelected={this.recordSelected}
        />

        <Tooltip id="tooltip" globalEventOff="click" />
        <Snackbar
          open={snackbar.open}
          type={snackbar.type}
          message={snackbar.message}
          timeout={snackbar.timeout}
          handleClose={this.hideSnackbar}
        />

        <RecordSelected
          isOpen={isNameRecordingOpen}
          link={linkName}
          handleClose={this.hideNameRecording}
          handleLinkRecord={this.handleLinkRecord}
        />

        <ShowOscilloscope
          isOpen={isOscilloscopeOpen}
          linkRecordings={this.linkRecordings}
          handleClose={this.hideOscilloscope}
          handleClearLinks={this.handleClearLinks}
        />
      </>
    );
  }
}
