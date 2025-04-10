"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => navigate("/login");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      try {
        const response = await fetch("https://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          setError("Successful registration. Please log in.");
          navigate("/login");
        } else {
          setError("Error registering.");
        }
      } catch (error) {
        console.error(error);
        setError("Error registering.");
      }
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <WelcomeText>CREATE ACCOUNT</WelcomeText>

      <Input type="email" name="email" placeholder="Email address" value={email} onChange={handleChange} />
      <Input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
      <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} />

      <Button type="submit">Register</Button>
      <Button type="button" onClick={handleLoginClick}>Go to Login</Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

const RegisterPage = () => {
  return (
    <LoginContainer>
      <TicketWrapper>
        <RegisterForm />
      </TicketWrapper>
    </LoginContainer>
  );
};

export default RegisterPage;

/* ---------- STYLED COMPONENTS ---------- */
const LoginContainer = styled.main`
  background-color: rgba(244, 223, 191, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 20px;
`;

const TicketWrapper = styled.div`
  position: relative;
  width: 700px;
  height: 650px;
  background-image: url("https://cdn.builder.io/api/v1/image/assets/5c6b8122df8048069c23eb442ff67257/2523baa9f1d8b127976b6590ec89261114914812?placeholderIfAbsent=true");
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
`;

const WelcomeText = styled.h1`
  margin-bottom: 24px;
  color: rgba(243, 222, 190, 1);
  font-family: 'Press Start 2P', cursive;
  font-size: 18px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  background-color: rgba(234, 170, 54, 1);
  border: none;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #d48830;
  }
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 12px;
  margin-top: 10px;
`;

