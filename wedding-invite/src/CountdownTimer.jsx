import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const CountdownTimer = ({ startDate, endDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now >= end) {
      return "Thank you for joining us!";
    } else if (now >= start) {
      return "Please enjoy and have fun!";
    } else {
      const difference = +start - +now;
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (typeof timeLeft === "string") {
    return <MessageContainer>{timeLeft}</MessageContainer>;
  }

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <React.Fragment key={interval}>
        <TimeValue>{timeLeft[interval]}</TimeValue> <TimeLabel>{interval}</TimeLabel>
        {index < Object.keys(timeLeft).length - 1 && <span>&nbsp;</span>}
      </React.Fragment>
    );
  });

  return (
    <TimerContainer>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </TimerContainer>
  );
};

export default CountdownTimer;

const shimmer = keyframes`
  0% {
    background-position: -40rem 0;
  }
  100% {
    background-position: 40rem 0;
  }
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #000; /* Make text color stand out */
  font-weight: bold; /* Make text bold */
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: fit-content;
  animation: ${shimmer} 2s infinite linear;
  background: linear-gradient(90deg, rgba(255, 195, 11, 0.5) 25%, rgba(255, 195, 11, 1) 50%, rgba(255, 195, 11, 0.5) 75%);
  background-size: 80rem 100%;
  @media screen and (max-width: 1200px) {
  font-size: 1.2rem;
  margin:5px auto;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #000; /* Make text color stand out */
  font-weight: bold; /* Make text bold */
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: fit-content;
`;

const TimeValue = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
//   color: #ffc30b; /* Golden color for numbers */
color:white;
  @media screen and (max-width: 1200px) {
  font-size: 1.4rem;
  margin:5px auto;
  }
`;

const TimeLabel = styled.span`
  font-size: 2rem;
//   color: #ffc30b; /* Golden color for labels */
color:white;
  @media screen and (max-width: 1200px) {
  font-size: 1.2rem;
  margin:5px auto;
  }
`;
