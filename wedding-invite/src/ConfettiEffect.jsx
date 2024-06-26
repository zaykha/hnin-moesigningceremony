// ConfettiEffect.js

import React, { useEffect } from 'react';
import './ConfettiEffect.css';

const ConfettiEffect = () => {
  useEffect(() => {
    const container = document.getElementById('confetti-container');
    const colors = ['#FFD700', '#FFD700', '#FFCC00', '#FFCC00'];  // Colors of the confetti particles

    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 80 + 'vw'; // Random horizontal position
      confetti.style.animationDuration = Math.random() * 2 + 1 + 's'; // Random animation duration
      container.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 3000); // Remove confetti after 3 seconds
    };

    const confettiInterval = setInterval(createConfetti, 200); // Interval to create confetti every 200ms

    return () => clearInterval(confettiInterval); // Clean up interval on component unmount
  }, []);

  return (
    <div id="confetti-container">
      {/* Container for confetti particles */}
    </div>
  );
};

export default ConfettiEffect;
