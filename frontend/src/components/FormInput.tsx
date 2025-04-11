'use client'; // Enables client-side rendering for this file

import styled from 'styled-components'; // Import styled-components for CSS-in-JS styling

// Define the props expected by the FormInput component
interface FormInputProps {
  placeholder: string; // Placeholder text shown inside the input
  type?: string; // Optional input type (e.g., "text", "email", "password")
  id?: string; // Optional HTML id attribute
  name?: string; // Optional name for form field
  value: string; // Controlled input value
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
}

// Stateless reusable input field styled with styled-components
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
        type={type} // Input type (default: text)
        name={name} // Form field name
        id={id} // Element ID for labeling
        value={value} // Controlled component value
        onChange={onChange} // Triggered when user types
        placeholder={placeholder} // Placeholder text
        aria-label={placeholder} // Accessibility label
      />
    </InputWrapper>
  );
};

// Wrapper around each input field for spacing/styling
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 37px;

  &:last-child {
    margin-bottom: 0; // Remove margin if it's the last input
  }
`;

// Styled input component with custom theming
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
    color: #888; // Placeholder color
    opacity: 1; // Full visibility
  }

  &:focus {
    outline: none;
    border-color: rgba(234, 170, 54, 1); // Highlight border on focus
  }
`;

export default FormInput;
