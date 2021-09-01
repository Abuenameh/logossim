import React, { useEffect } from 'react';
import Tooltip from 'react-tooltip';

import styled from 'styled-components';

import { Close } from '../Icons';
import Modal from '../Modal/Modal';
import {
  Header,
  Title,
  Content,
  IconButton,
} from '../Modal/ModalContentLayout';

import { ComposedChart, XAxis, YAxis, Line, Area, ResponsiveContainer } from 'recharts';

const Scopes = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Footer = styled.div`
  display: flex;
  margin-top: auto;
`;

const ClearLinksButton = styled.button.attrs(({ ...props }) => ({
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

const ScopesScroll = styled.div`
  max-height: calc(90vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const Scope = styled.div`
  display: flex;
`;

const Name = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Graph = styled.div`
  width: 90%;
`;

const OscilloscopeWindow = ({ linkRecordings, handleClose, handleClearLinks }) => {
  const getMaxValue = link => link.hasValue() ? 2**link.getValue().length() - 1 : 1;
  const convertValue = value => value ? (typeof value === 'number' ? value : value.reduce((acc, val) => (acc << 1) | val )) : value;
  const removeInvalid = value => typeof value === 'number' ? value : 0;
  const getColor = cssvar => getComputedStyle(document.body).getPropertyValue(cssvar);

  useEffect(Tooltip.rebuild);

  return (
    <Modal
      width="90"
      height="90"
      maxDim={false}
    >
      <Header>
        <Title>Oscilloscope</Title>
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
        <Scopes>
          <ScopesScroll>
            {linkRecordings.map(
              (link, name) => (
                <Scope key={name}>
                  <Name
                    data-for="tooltip"
                    data-tip={link.getName()}
                    data-place="right"
                  >
                    {link.getName()}
                  </Name>
                  <Graph>
                    <ResponsiveContainer height={120}>
                      <ComposedChart
                        data={link.getRecording().map(value => convertValue(value)).map((value, index) => { return { t: index, y: removeInvalid(value), e: value === 'e' ? getMaxValue(link) : 0, x: value === 'x' ? getMaxValue(link) : 0 };})}
                      >
                        <XAxis dataKey="t" type="number" tick={false} height={1} />
                        <YAxis tickCount={getMaxValue(link)+1} domain={[0, getMaxValue(link)]}/>
                        <Line type="stepAfter" dataKey="y" dot={false} strokeWidth={5} stroke={getColor("--value-on")} />
                        <Area type="stepAfter" dataKey="x" fill={getColor("--value-floating")}/>
                        <Area type="stepAfter" dataKey="e" fill={getColor("--value-error")}/>
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Graph>
                </Scope>
              ),
            )}
          </ScopesScroll>
          <Footer>
            <ClearLinksButton onClick={handleClearLinks}>
              Clear all monitored connections
            </ClearLinksButton>
          </Footer>
        </Scopes>
      </Content>
    </Modal>
  );
};

export default OscilloscopeWindow;
