import React from 'react';
import styled from 'styled-components/macro';
import { Logos } from './Logos';
import { Title } from 'app/containers/HomePage/components/Title';
import { Lead } from 'app/containers/HomePage/components/Lead';
import { A } from 'app/components/A';

export function Masthead() {
  return (
    <Wrapper>
      <Logos />
      <Title>Recognize and Recommend</Title>
      <Lead>
        Now you can use the{' '}
        <A
          href="https://www.reactboilerplate.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Recognize And Recommend
        </A>{' '}
        as a{' '}
        <A
          href="https://github.com/facebook/create-react-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          R{'&'}R
        </A>{' '}
        template.
      </Lead>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
`;
