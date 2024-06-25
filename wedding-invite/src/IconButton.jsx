import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: #FDB515;
  color: white;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 17px;
  font-weight: 500;
  border-radius: 0.9em;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 1.6em -0.6em #FFdf00;
  overflow: hidden;
  position: relative;
  height: 2.8em;
  padding-right: 3.3em;
  cursor: pointer;
  transition: all 0.3s;

  &:hover .icon {
    width: calc(100% - 0.6em);
  }

  &:active .icon {
    transform: scale(0.95);
  }
`;

const IconContainer = styled.div`
  background: white;
  margin-left: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 2.2em;
  border-radius: 0.7em;
  box-shadow: 0.1em 0.1em 0.6em 0.2em #FFdf00;
  right: 0.3em;
  transition: all 0.3s;
`;

const Icon = styled.svg`
  width: 1.1em;
  color: #7b52b9;
  transition: transform 0.3s;

  ${StyledButton}:hover & {
    transform: translateX(0.1em);
  }
`;

const StyledButtonWithIcon = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
      <IconContainer className="icon">
        <Icon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            fill="#b0903d"
          ></path>
        </Icon>
      </IconContainer>
    </StyledButton>
  );
};

export default StyledButtonWithIcon;
