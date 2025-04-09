'use client';
import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';

export const LoginPage = () => {
  return (
    <LoginContainer>
      <TicketWrapper>
        <LoginForm />
      </TicketWrapper>
    </LoginContainer>
  );
};

const LoginContainer = styled.main`
  background-color: rgba(244, 223, 191, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* fill vertical space */
  padding: 0 20px;
`;

const TicketWrapper = styled.div`
  position: relative;
  width: 700px; /* Adjust as needed */
  height: 650px; /* Adjust as needed */
  background-image: url('https://cdn.builder.io/api/v1/image/assets/5c6b8122df8048069c23eb442ff67257/2523baa9f1d8b127976b6590ec89261114914812?placeholderIfAbsent=true');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  /* Center the form inside the ticket */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Some inner padding so the form isn't flush to edges */
  padding: 20px;
  box-sizing: border-box;
`;

export default LoginPage;
