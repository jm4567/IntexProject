'use client'; // Enables client-side rendering in Next.js or similar frameworks

import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

// LoginPage component that renders the styled login form wrapped in a "ticket" background
export const LoginPage = () => {
  const navigate = useNavigate(); // Navigation hook from React Router

  return (
    <LoginContainer>
      {/* Button to navigate back to the home page */}
      <GoHomeButton onClick={() => navigate('/')}>Go Back to Home</GoHomeButton>

      {/* Decorative ticket background with the LoginForm centered inside */}
      <TicketWrapper>
        <LoginForm />
      </TicketWrapper>
    </LoginContainer>
  );
};

// Main container that centers the ticket on the page
const LoginContainer = styled.main`
  background-color: rgba(244, 223, 191, 1); // Warm beige background
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; // Full height of the viewport
  padding: 0 20px; // Horizontal padding
`;

// Ticket background styled container for the login form
const TicketWrapper = styled.div`
  position: relative;
  width: 700px;
  height: 650px;
  background-image: url('https://cdn.builder.io/api/v1/image/assets/5c6b8122df8048069c23eb442ff67257/2523baa9f1d8b127976b6590ec89261114914812?placeholderIfAbsent=true');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  // Center the form content
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // Padding to prevent form from touching edges
  padding: 20px;
  box-sizing: border-box;
`;

// Button to go back to homepage
const GoHomeButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  padding: 10px 16px;
  background-color: #eaaa36; // Bright golden color
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  z-index: 999;

  // Hover and click effects
  &:hover {
    background-color: #d48830;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export default LoginPage;
