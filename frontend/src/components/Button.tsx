'use client';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ children, onClick, type = 'button' }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border-radius: 10px;
  background-color: rgba(234, 170, 54, 1);
  padding: 8px 20px;
  border: none;
  cursor: pointer;
  font-family:
    Baloo 2,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 20px;
  color: #8B0000;
  text-align: center;
  margin-bottom: 20px;

  /* Let the button size to its content naturally */
  width: auto;
  &:hover {
  background-color: #d48830
  }
`;

export default Button;
