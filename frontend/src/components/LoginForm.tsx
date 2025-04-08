'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import FormInput from './FormInput';


export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <WelcomeText>WELCOME BACK</WelcomeText>
      <LogoImage
        src="https://cdn.builder.io/api/v1/image/assets/5c6b8122df8048069c23eb442ff67257/b1909f44462666afeb14dc5a60b269c13c38030b?placeholderIfAbsent=true"
        alt="Logo"
      />

      <InputsContainer>
        <FormInput
          placeholder="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputsContainer>

      <Button type="submit">SIGN IN</Button>
      <ForgotPasswordLink href="#">Forgot Password</ForgotPasswordLink>
      <ForgotPasswordLink href="#">Create Account</ForgotPasswordLink>
    </FormContainer>
  );
};

/* ----- STYLES ----- */

const FormContainer = styled.form`
  /* Center form items, limit width so it doesn't overflow ticket */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 240px;
  box-sizing: border-box;
`;

const WelcomeText = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  color: rgba(243, 222, 190, 1);
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  font-size: 24px;
  line-height: 1.5;
`;

const LogoImage = styled.img`
  width: 80px;
  height: auto;
  margin-bottom: 20px;
  object-fit: contain;
`;

const InputsContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0px; /* space between fields */
  margin-bottom: 20px;
`;

const ForgotPasswordLink = styled.a`
  font-family:
    Baloo 2,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 10px;
  color: rgba(243, 222, 191, 1);
  margin-top: 8px;
  text-decoration: none;

  &:hover {
    color: #d48830
  }
`;

export default LoginForm;
