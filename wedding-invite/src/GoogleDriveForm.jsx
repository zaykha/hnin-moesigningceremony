import React, { useState } from 'react';
import styled from 'styled-components';

const GoogleDriveForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // Send the Google Drive link to the user's email
    // You can use a backend service to send the email
    setSubmitted(true);
  };

  return (
    <FormContainer>
      <h2>Access Event Photos</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Get Access</Button>
        </form>
      ) : (
        <p>Thank you! A link to the event photos has been sent to your email.</p>
      )}
    </FormContainer>
  );
};

export default GoogleDriveForm;

const FormContainer = styled.div`
  width: 90vw;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  text-align: center;
  margin: 20px auto;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #ffc30b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  &:hover {
    background-color: #ffa500;
  }
`;
