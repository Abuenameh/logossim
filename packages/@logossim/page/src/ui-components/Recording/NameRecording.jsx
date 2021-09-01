import React, { useEffect, useRef } from 'react';
import Tooltip from 'react-tooltip';

import { Formik, Form as BaseForm, Field } from 'formik';
import styled from 'styled-components';

import { Close } from '../Icons';
import Modal from '../Modal/Modal';
import {
  Header,
  Title,
  Content,
  IconButton,
} from '../Modal/ModalContentLayout';
import ComponentConfigurationInput from '../ComponentSelect/ComponentConfigurationInput';

const Form = styled(BaseForm)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Footer = styled.div`
  display: flex;
  margin-top: auto;
`;

const SubmitButton = styled.button.attrs(({ ...props }) => ({
  ...props,
  type: 'submit',
}))`
  border: none;
  border-radius: 5px;
  background: #07d26b;

  color: white;
  font-size: 1.2em;

  width: 100%;
  padding: 5px 20px;
  margin: 5px;

  :disabled {
    background: #d22307;
    cursor: not-allowed;
  }
`;

const NameRecording = ({ handleClose, handleSubmit }) => {
  const firstInputRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    } else {
      buttonRef.current.focus();
    }
  });

  useEffect(Tooltip.rebuild);

  return (
    <Modal
      width="60"
      height="35"
    >
      <Header>
        <Title>Name recording</Title>
        <IconButton
          right
          onClick={handleClose}
          data-for="tooltip"
          data-tip="Close"
          data-place="left"
        >
          <Close />
        </IconButton>
      </Header>

      <Content>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={values => {
            handleSubmit(values);
            handleClose();
          }}
        >
          {({ isValid }) => (
            <Form>
              <Field
                key="name"
                name="name"
                type="text"
                label="Name for recording"
                component={ComponentConfigurationInput}
                innerRef={firstInputRef}
                validate={value => value === "" ? "Name cannot be empty" : null}
              />

              <Footer>
                <SubmitButton disabled={!isValid} ref={buttonRef}>
                  Set recording name
                </SubmitButton>
              </Footer>
            </Form>
          )}
        </Formik>
      </Content>
    </Modal>
  );
};

export default NameRecording;
