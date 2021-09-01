import React, { useEffect, useCallback } from 'react';

import Modal from '../Modal/Modal';
import OscilloscopeWindow from '../Recording/OscilloscopeWindow';

const closeOnEsc = ({ code }, handleClose) => {
  if (code !== 'Escape') return;
  handleClose();
};

const ShowOscilloscope = ({
  isOpen,
  linkRecordings,
  handleClose,
  handleClearLinks,
}) => {
  const callback = useCallback(
    event => closeOnEsc(event, handleClose),
    [handleClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', callback);
    return () => window.removeEventListener('keydown', callback);
  }, [callback]);

  if (!isOpen) return null;

  return (
    <Modal
      width="90"
      height="90"
      maxDim={false}
    >
      <OscilloscopeWindow
        linkRecordings={linkRecordings}
        handleClose={handleClose}
        handleClearLinks={handleClearLinks}
      />
    </Modal>
  );
};

export default ShowOscilloscope;
