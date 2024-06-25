import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

AOS.init();
const BlinkingText = styled.span`
  /* Apply blinking animation */
  animation: blinker 1s linear infinite;
`;
const shimmerAnimation = keyframes`
  0% {
      background-position: -1.3rem -1.3rem;
  }
  100% {
    background-position: 1.4rem 1.4rem;
  }
`;
const blinkerAnimation = `
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;
const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //   overflow: hidden;
  color: #6a4b3c;
`;

const EventDetails = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Letter = styled.div`
  width: 60%;
  background-color: ivory;
  border: 2px solid #c0a16b;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Parisienne", cursive;
  font-size: 1.7rem;
  text-align: center;
  position: relative;
  //   max-height: 0;
  overflow: hidden;
  transition: max-height 2s ease-out;
   @media screen and (max-width: 1200px) {
    width: 90%;
  }
`;

const RoyalHeader = styled.span`
  font-weight: bold;
  font-size: 1.8rem;
  /* Apply shimmer animation */
//   animation: ${(props) => (props.shimmer ? shimmerAnimation : "none")} 8s
//     infinite linear;
  background: linear-gradient(To Right, #996515, #f5bf03, #ffd700);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;
const RoyalFooter = styled.div`
  font-size: 1.2em;
  margin-top: 40px;
  color: #6a4b3c;
`;

const InvitationLetter = ({ GuestNames }) => {
    const { t } = useTranslation();
  const eventName = "Our Signing Ceremony";
  const eventDate = "July 7th, 2024";
  const eventTime = "11:00 AM - 1:00 PM";
  const eventVenue = "The Seeds Restaurant";
  const yourName = "Hnin & Moe";
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation
      easing: "ease-out", // Easing function for the animation
      once: true, // Whether the animation should happen only once or every time you scroll up and down to the element
    });
  }, []);

  return (
    <LetterContainer>
      <Letter data-aos="fade-in">
        <RoyalHeader shimmer>
          {t("Dear")} <BlinkingText>{GuestNames?.join(", ")}</BlinkingText>,
        </RoyalHeader>
        {/* Add content here */}

        <p>
          <BlinkingText>
            {t("We hope this message finds you well. It is with great joy that we extend this invitation to join us for a memorable celebration. Your presence would truly make our day complete.")}
          </BlinkingText>
        </p>
        <p>
          <strong>{t("Event Details:")}</strong>
        </p>
        <EventDetails>
          <li>
            <strong>{t("Date:")}</strong> {eventDate}
          </li>
          <li>
            <strong>{t("Time:")}</strong> {eventTime}
          </li>
          <li>
            <strong>{t("Venue:")}</strong> {eventVenue}
          </li>
        </EventDetails>
        <p>
          {t("We have planned an occasion filled with warmth, laughter, and cherished moments. Your company means the world to us, and we cannot wait to share this special day with you.")}
        </p>
        <p>
          {t("Please RSVP By Pressing next button, so we can ensure everything is perfect for your visit.")}
        </p>
        <p>{t("Warm regards,")}</p>
        <p>Hnin & Moe</p>
      </Letter>
    </LetterContainer>
  );
};

export default InvitationLetter;
