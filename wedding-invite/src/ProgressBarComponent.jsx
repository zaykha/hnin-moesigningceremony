import React from "react";
import styled from "styled-components";

const ProgressContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 20px 0;
`;

const ProgressBar = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: #ffc627; /* Your progress bar color */
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

const ProgressBarComponent = ({ progress }) => (
  <ProgressContainer>
    <ProgressBar progress={progress} />
  </ProgressContainer>
);

export default ProgressBarComponent;
