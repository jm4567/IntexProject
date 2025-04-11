'use client';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure Font Awesome is loaded
import FormInput from './FormInput';
import Button from './Button';

const LoginForm = () => {
  // State variables for email, password, remember me, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  // state variable for error messages
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Redirect to the backend endpoint that initiates the Google challenge.
    window.location.href = 'https://localhost:5000/external-login/google';
  };

  const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);


  // Dynamically load the retro Google Font (for the welcome text)

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://accounts.google.com/gsi/client';
  //   script.async = true;
  //   script.defer = true;
  //   script.onload = () => {
  //     // Use a type assertion so TypeScript doesn't complain
  //     const google = (window as any).google;
  //     if (google && google.accounts) {
  //       google.accounts.id.initialize({
  //         client_id:
  //           '502286415472-a6q0duatohbvu7mdf43jbuiulhg3p381.apps.googleusercontent.com',
  //         callback: handleGoogleResponse,
  //       });

  //       google.accounts.id.renderButton(
  //         document.getElementById('g_id_signin'),
  //         { theme: 'outline', size: 'large' }
  //       );
  //     } else {
  //       console.error('Google API failed to load.');
  //     }
  //   };

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // Generic change handler for inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Navigate to registration page
  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Choose correct URL based on the rememberme toggle
    const loginUrl = rememberme
      ? 'https://localhost:5000/login?useCookies=true&useSessionCookies=false'
      : 'https://localhost:5000/login?useSessionCookies=true&useCookies=false';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include', // ✅ Ensures cookies are sent & received
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Parse JSON only if content exists
      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/movies');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <WelcomeText>WELCOME BACK</WelcomeText>
      <LogoImage
        src="https://cdn.builder.io/api/v1/image/assets/5c6b8122df8048069c23eb442ff67257/b1909f44462666afeb14dc5a60b269c13c38030b?placeholderIfAbsent=true"
        alt="Logo"
      />

      <InputWrapper>
        <FormInput
          type="email"
          name="email" // Added name
          id="email" // Changed id to email
          placeholder="Email address"
          value={email}
          onChange={handleChange}
        />
      </InputWrapper>

      <InputWrapper>
        <FormInput
          type={showPassword ? 'text' : 'password'}
          name="password" // Added name
          id="password" // Changed id to password
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

      <CheckboxWrapper>
        <Checkbox
          type="checkbox"
          name="rememberme"
          checked={rememberme}
          onChange={handleChange}
          id="rememberme"
        />
        <CheckboxLabel htmlFor="rememberme">Remember password</CheckboxLabel>
      </CheckboxWrapper>

      <Button type="submit">SIGN IN</Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ForgotPasswordLink onClick={handleRegisterClick}>
        Create Account
      </ForgotPasswordLink>
    </FormContainer>
  );
};

export default LoginForm;

/* ==================== STYLED COMPONENTS ==================== */

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
  font-family: 'Roboto', cursive;
  font-size: 24px;
  line-height: 1.5;
`;

const LogoImage = styled.img`
  width: 80px;
  height: auto;
  margin-bottom: 20px;
  object-fit: contain;
`;

const InputWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0px;
<<<<<<< HEAD
  margin-bottom: 20px;
  position: relative; /* ⬅️ This is the key */
  font-family: 'Roboto', sans-serif;
=======
  margin-bottom: 5px;
  position: relative; /* This is the key */
>>>>>>> e4a192eab09a1e7c70e96ab6e9313ee2df9991ea
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  margin-right: 6px;
`;

const CheckboxLabel = styled.label`
  font-size: 13px;
  color: rgba(243, 222, 190, 1);
  font-family: 'Roboto', sans-serif;
`;

const ErrorMessage = styled.p`
  color: rgba(234, 170, 54, 1);
  font-size: 13px;
  text-align: cent;
  font-family: 'Roboto', sans-serif;
`;

const ForgotPasswordLink = styled.a`
  font-family:
    Baloo 2,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  color: rgba(243, 222, 191, 1);
  margin-top: 0px;
  text-decoration: none;

  &:hover {
    color: #d48830;
  }
`;
const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 30%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  color: #555;
  cursor: pointer;
`;
