'use client';
import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <LoginContainer>
      <GoHomeButton onClick={() => navigate('/')}>Go Back to Home</GoHomeButton>
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
const GoHomeButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  padding: 10px 16px;
  background-color: #eaaa36;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;

  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  z-index: 999;

  &:hover {
    background-color: #d48830;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export default LoginPage;
