import React from 'react';
import styled, { keyframes } from 'styled-components';

// Random number function
const random = (min, max) => Math.random() * (max - min) + min;

// Keyframes for glitter animation
const glitterAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0);
    opacity: 1;
  }
  100% {
    transform: translateY(1vh) rotate(720deg);
    opacity: 0;
  }
`;

// Styled Glitter component
const Glitter = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: white; /* Golden color */
  opacity: 0;
  border-radius: 50%;
  animation: ${glitterAnimation} ${({ duration }) => duration}s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
  pointer-events: none;
`;

// Glitter Container component to manage multiple glitters
const GlitterContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const GlitterEffect = ({ numGlitters = 20 }) => {
  const glitters = [];

  // Generate random glitters
  for (let i = 0; i < numGlitters; i++) {
    const size = random(5, 15);
    const duration = random(4, 8);
    const delay = random(0, 5);
    const style = {
      top: `${random(-20, 90)}vh`, // Random vertical position
      left: `${random(-20, 90)}vw`, // Random horizontal position
    };
    glitters.push(<Glitter key={i} size={size} duration={duration} delay={delay} style={style} />);
  }

  return <GlitterContainer>{glitters}</GlitterContainer>;
};

export default GlitterEffect;
