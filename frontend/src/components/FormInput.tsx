'use client';
import styled from 'styled-components';

interface FormInputProps {
  placeholder: string;
  type?: string;
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  placeholder,
  type = 'text',
  id,
  value,
  name,
  onChange,
}: FormInputProps) => {
  return (
    <InputWrapper>
      <Input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 37px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px; 
  border: 1px solid #43786c;
  border-radius: 7px;
  font-family:
    Baloo 2,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  color: #43786c;

  &::placeholder {
    color: #888; /* or any color you'd like for placeholder text */
    opacity: 1; /* ensure the placeholder is fully visible */
  }

  &:focus {
    outline: none;
    border-color: rgba(234, 170, 54, 1);
  }
`;

export default FormInput;
