// src/components/LanguageSelection.jsx
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import mm from "./assets/mm.svg";
import gb from "./assets/gb.svg";
import bgmobile from "./assets/selectLanguage1.jpg";
import { useNavigate } from "react-router-dom";

// Keyframes for flashing effect
const flashAnimation = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const FlashingTitle = styled.h2`
  animation: ${flashAnimation} 3s infinite;
  text-align: center;
  margin-top: 50px;
`;
const LSContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url(${bgmobile}) no-repeat;
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 1200px) {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)),
      url(${bgmobile}) no-repeat;
    background-size: cover;
    background-position: center;
  }
`;

const FlagIMG = styled.img`
  width: 200px;
  margin-left: 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    border: 1px solid white;
  }
  @media screen and (max-width: 1200px) {
    max-width: 100px;
    &:hover {
      cursor: pointer;
      width: 110px;
    }
  }
`;

const languagePhrases = [
  "Choose your language", // English
  "ဘာသာစကားကိုရွေးချယ်ပါ။", // Myanmar
  // Add more languages here
];

const LanguageSelection = ({ setLanguage }) => {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const changeLanguageAndNavigate = (languageCode) => {
    changeLanguage(languageCode); // your existing changeLanguage function
    navigate("/login"); // routes the user to the "/calculate" page
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLanguageIndex(
        (prevIndex) => (prevIndex + 1) % languagePhrases.length
      );
    }, 3000); // Change language every 3 seconds

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);
  return (
    <LSContainer data-aos="fade-in" data-aos-delay="200">
      {/* <h1 style={{color: 'white'}}>Welcome to our Wedding RSVP</h1> */}
      <div
        style={{
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          //   marginTop: "30px",
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          // -webkit-backdrop-filter: blur(5px);
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <FlashingTitle>{languagePhrases[currentLanguageIndex]}</FlashingTitle>
        <div>
          <FlagIMG
            src={mm}
            alt=""
            onClick={() => changeLanguageAndNavigate("mm")}
          />
          <FlagIMG
            src={gb}
            alt=""
            onClick={() => changeLanguageAndNavigate("en")}
          />
        </div>
      </div>
    </LSContainer>
  );
};

export default LanguageSelection;
