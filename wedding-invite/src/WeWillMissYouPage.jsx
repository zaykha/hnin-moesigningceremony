import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgmobile from "./assets/bg1.jpg";
import styled from "styled-components";
import ConfettiEffect from "./ConfettiEffect";
import GlitterEffect from "./GlitterEffect";
import GoogleMapsEmbed from "./LocationMap";
import { useTranslation } from "react-i18next";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
  //   url(${bgmobile}) no-repeat;
  // background-size: cover;
  // background-position: center;

  @media screen and (max-width: 1200px) {
    // background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)),
    //   url(${bgmobile}) no-repeat;
    // background-size: cover;
    // background-position: center;
  }
`;
const BgContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url(${bgmobile}) no-repeat;
  background-size: cover;
  background-position: center;
`;
const StyledContainer = styled.div`
  width: 60vw;
  /* height: 90vh; */
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* marginTop: 30px; */
  background: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* backdropFilter: blur(5px); */
  /* -webkit-backdrop-filter: blur(5px); */
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 999;
  text-align: center;
  font-family: "Quicksand", cursive;
  @media screen and (max-width: 1200px) {
    width: 90%;
    padding: 1.1rem;
  }
`;
const WeWillMissYouPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleRedirect = () => {
    navigate("/", { replace: true });
  };
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      handleRedirect();
    };
  }, [navigate]);
  return (
    <Container>
      <BgContainer/>
      <StyledContainer>
        <h1>{t("We Will Miss You!")}</h1>
        <p>
          {t("We understand that you cannot attend the event. We will miss you and look forward to catching up soon!")}
        </p>
        <p>
          {t("If you change your mind and would like to join us, please let us know by July 5th, and we will do our best to accommodate.")}
        </p>
        <p>
          {t("If you would like to add more guests, please let us know by July 5th,and we will do our best to accommodate.")}
        </p>
        {/* <button onClick={() => navigate("/")}>Go to Home</button> */}
      </StyledContainer>
    </Container>
  );
};

export default WeWillMissYouPage;
