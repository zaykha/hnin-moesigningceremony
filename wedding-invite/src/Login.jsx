// src/components/Login.jsx
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import bgmobile from "./assets/Login.jpg";
import { useNavigate } from "react-router-dom";
import StyledButtonWithIcon from "./IconButton";
import guests from "./guests.json";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useTranslation } from "react-i18next";
const Container = styled.div`
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)),
  //   url(${bgmobile}) no-repeat;
  // background-size: cover;
  // background-position: center;

  @media screen and (max-width: 1200px) {
    // background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),
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
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Input = styled.input`
  //   margin: 0.5rem;
  //   padding: 0.5rem;
  //   font-size: 1rem;
  position: relative;
`;
const Label = styled.label`
  position: absolute;
  left: 0;
  top: 0;
  padding: calc(0.5rem * 0.75) calc(0.5rem * 0.5);
  margin: calc(0.5rem * 0.75 + 3px) calc(0.5rem * 0.5);
  background: pink;
  white-space: nowrap;
  transform: translate(0, 0);
  transform-origin: 0 0;
  background: transparent;
  transition: transform 120ms ease-in;
  font-weight: bold;
  line-height: 1.2;
  pointer-events: none;
`;
export const InputContainer = styled.div`
  position: relative;
  margin: 0.5rem 0;
`;
const InputField = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  //   height: 40px;
  border: 2px solid #ffc627;
  padding: calc(0.5rem * 1.5) 0.5rem;
  color: #ffc627;
  background: transparent;
  border-radius: 10px;
  appearance: none; /* Remove default input appearance */
  outline: none; /* Remove default outline */

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    transform: translate(0.25rem, -65%) scale(0.8);
    color: #ffc627;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 3px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(20px);
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
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
export const CustomInput = ({ id, label, onChange, ...props }) => {
  return (
    <InputContainer>
      <InputField id={id} placeholder=" " {...props} onChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </InputContainer>
  );
};

const Login = ({ setGuestNames, setAlreadyFilled }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    const guest = guests.find(
      (guest) => guest.username === username && guest.password === password
    );
    if (guest) {
      const guestNames = guest.guestNames;
      const fetchGuestData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "rsvps"));
          const data = querySnapshot.docs.map((doc) => doc.data());
          const flattenedData = data.flatMap((item) =>
            item.guests.map((guest) => ({
              ...guest,
              // Attach the document ID for reference if needed
            }))
          );

          console.log(flattenedData);
          const findGuest = flattenedData.find(
            (guest) => guest.name === username
          );
          console.log(findGuest, username);
          if (findGuest) {
            // Find guests in flattenedData based on guestNames
            const matchingGuests = flattenedData.filter((guest) =>
              guestNames.includes(guest.name)
            );
            if (matchingGuests.length > 0) {
              setAlreadyFilled(matchingGuests);
              navigate("/amendDetailsPage");
            } else {
              console.log("No matching guests found in RSVP data");
              navigate("/RSVPForm");
            }
          } else {
            console.log("No such document!");
            navigate("/RSVPForm");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        } finally {
          setIsLoading(false); // Stop loading
        }
      };

      fetchGuestData();
      setGuestNames(guest.guestNames);
      // navigate("/RSVPForm");
    } else {
      setError("Invalid username or password");
      setIsLoading(false);
    }
  };

  return (
    <Container data-aos="fade-in" data-aos-delay="200">
      <BgContainer/>
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
        <h1>{t("Welcome")}</h1>
        <CustomInput
          id="name"
          label={t("User Name")}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <CustomInput
          id="password"
          label={t("password")}
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isLoading ? (
          <LoaderContainer>
            <LoaderRing />
          </LoaderContainer>
        ) : (
          <StyledButtonWithIcon onClick={handleLogin}>
            {t("Login")}
          </StyledButtonWithIcon>
        )}{" "}
        {/* <Button onClick={handleLogin}>Login</Button> */}
      </div>
    </Container>
  );
};

export default Login;
