import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const MapContainer = styled.div`
  width: 60vw;
  margin: 0 auto;
  position: relative;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    width: 90%;
  }
`;
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoaderRing = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #ffdf00;
  animation: ${rotateAnimation} 1s linear infinite;
`;

const GoogleMapsEmbed = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <MapContainer>
      {isLoading && (
        <LoaderContainer>
          <LoaderRing />
        </LoaderContainer>
      )}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.5870532656545!2d96.14972721244622!3d16.846829983884223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1949e32e64a3d%3A0x873cfea1ed55286!2sSEEDS%20Restaurant%20%26%20Lounge!5e0!3m2!1sen!2smm!4v1719334133772!5m2!1sen!2smm"
        width="100%"
        height="450px"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={handleLoad}
      ></iframe>
    </MapContainer>
  );
};

export default GoogleMapsEmbed;
