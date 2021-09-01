import React, { useEffect, useCallback } from 'react';

import Modal from '../Modal/Modal';
import NameRecording from '../Recording/NameRecording';

const closeOnEsc = ({ code }, handleClose) => {
  if (code !== 'Escape') return;
  handleClose();
};

const RecordSelected = ({
  isOpen,
  link,
  handleClose,
  handleLinkRecord,
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
      width="60"
      height="35"
    >
      <NameRecording
        handleClose={handleClose}
        handleSubmit={({ name }) => handleLinkRecord(link.props['component'], name)}
      />
    </Modal>
  );
};

export default RecordSelected;
