'use client'; // Enables client-side rendering for frameworks like Next.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom'; // Hooks for navigation and reading query params

// Register form component to create a new account
const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Used to extract query parameters from URL

  // Form field states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Navigate to login page
  const handleLoginClick = () => navigate('/login');

  // Handle input changes and update form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // On mount: load Google font and optionally set email from query string
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // If email query param exists (e.g., from redirect), set it
    const params = new URLSearchParams(location.search);
    const emailFromQuery = params.get('email');
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [location]);

  // Handles form submission and calls backend register API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      try {
        const response = await fetch('https://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          // Registration successful, redirect to login
          setError('');
          navigate('/login');
        } else {
          // Handle API errors
          const data = await response.json();
          let messages = 'Error registering.';
          if (data.errors) {
            if (Array.isArray(data.errors)) {
              messages = data.errors.map((e: any) => e.description).join(' ');
            } else {
              messages = Object.values(data.errors).flat().join(' ');
            }
          }
          setError(messages);
        }
      } catch (error) {
        console.error(error);
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <WelcomeText>CREATE ACCOUNT</WelcomeText>

      {/* Email input */}
      <Input
        type="email"
        name="email"
        placeholder="Email address"
        value={email}
        onChange={handleChange}
        disabled={!!email} // Prevent editing if email is pre-filled
      />

      {/* Password input with toggle */}
      <InputWrapper>
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <ToggleButton
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </ToggleButton>
      </InputWrapper>

      {/* Confirm password input */}
      <InputWrapper>
        <Input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
        />
      </InputWrapper>

      {/* Buttons */}
      <Button type="submit">Register</Button>
      <Button type="button" onClick={handleLoginClick}>
        Go to Login
      </Button>

      {/* Error message */}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

// Full page wrapper around the register form
const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <LoginContainer>
      <GoHomeButton onClick={() => navigate('/')}>Go Back to Home</GoHomeButton>
      <TicketWrapper>
        <RegisterForm />
      </TicketWrapper>
    </LoginContainer>
  );
};

export default RegisterPage;

/* ---------- STYLED COMPONENTS ---------- */

// Page background and layout container
const LoginContainer = styled.main`
  background-color: rgba(244, 223, 191, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 20px;
`;

// Styled movie ticket wrapper (background image)
const TicketWrapper = styled.div`
  position: relative;
  width: 700px;
  height: 650px;
  background-image: url('https://cdn.builder.io/api/v1/image/assets/5c6b8122df8048069c23eb442ff67257/2523baa9f1d8b127976b6590ec89261114914812?placeholderIfAbsent=true');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

// Register form container
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
`;

// Retro pixel font title
const WelcomeText = styled.h1`
  margin-bottom: 24px;
  color: rgba(243, 222, 190, 1);
  font-family: 'Press Start 2P', cursive;
  font-size: 18px;
  text-align: center;
`;

// Input fields
const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px; // leaves space for toggle button
  margin-bottom: 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

// Form action buttons
const Button = styled.button`
  width: 75%;
  background-color: rgba(234, 170, 54, 1);
  border: none;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #d48830;
  }
`;

// Error message styling
const ErrorMessage = styled.p`
  color: rgba(243, 222, 190, 1);
  font-size: 10px;
  margin-top: 10px;
`;

// Wrapper to position the show/hide toggle
const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 12px;
`;

// Toggle visibility of password field
const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

// Button to return to the homepage
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
