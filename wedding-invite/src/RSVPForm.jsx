// src/components/RSVPForm.jsx
import React, { useEffect, useState } from "react";
import { db } from "../src/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import styled, { keyframes } from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import bgmobile from "./assets/bg1.jpg";
import { CustomInput } from "./Login";
import InvitationLetter from "./InvitationLetter";
import GlitterEffect from "./GlitterEffect";
import StyledButtonWithIcon from "./IconButton";
import GoogleMapsEmbed from "./LocationMap";
import ConfettiEffect from "./ConfettiEffect";
import DressCodeSection from "./DressCodeSection";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  // position:fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
  //   url(${bgmobile}) no-repeat;
  // background-size: cover;
  // background-position: center;
  // background-attachment: fixed;

  @media screen and (max-width: 1200px) {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)),
      url(${bgmobile}) no-repeat;
    background-size: cover;
    background-position: center;
    // justify-content: flex-start;
  }
  @media screen and (max-width: 768px) {
    justify-content: flex-start;
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
  width: 90vw;
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
  @media screen and (max-width: 1200px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;
const Form = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  z-index: 999;
  // border: 1px solid green;
  display: flex;
  align-items: center;
  justify-content: center;
  // flex-wrap: wrap;
  border: 1px solid grey;
  border-radius: 15px;
  margin: 20px auto;
  // padding: 20px;
  @media screen and (max-width: 1200px) {
    width: 90vw;
    // padding: 1.1rem;
  }
`;
const Flexdiv = styled.div`
  // border: 1px solid red;
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
`;
const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Select = styled.select`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const StyledButtonWithIcon1 = styled.button`
  margin: 10px;
  padding: 15px 30px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  box-shadow: 0px 0px 14px -7px #f09819;
  background-image: linear-gradient(
    45deg,
    #ff512f 0%,
    #f09819 51%,
    #ff512f 100%
  );
  cursor: pointer;
  user-select: none;
`;
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px;
  cursor: pointer;
  background: ${(props) => {
    if (props.completed) return "#4caf50";
    if (props.active) return "#f09819";
    return "#fff";
  }};
  color: ${(props) => (props.active || props.completed ? "#fff" : "#000")};
  border: 2px solid ${(props) => (props.completed ? "#4caf50" : "#ccc")};
  border-radius: 5px;
  margin: 5px;
`;

// Define keyframes for background animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
`;
const StyledButtonRadio = styled.div`
  width: 10rem;
  padding: 10px 20px;
  background-color: ${(props) => (props.selected ? "#d4af37" : "white")};
  color: ${(props) => (props.selected ? "black" : "#000")};
  border: 2px solid ${(props) => (props.selected ? "#d4af37" : "#000")};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  margin: 10px;
  &:hover {
    background-color: ${(props) => (props.selected ? "#d4af37" : "#a28557")};
    color: white;
    border-color: white;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;
// Styled component for the button
const StyledButton = styled.button`
  position: relative;
  top: -20px;
  right: 50%;
  margin: 10px;
  padding: 15px 30px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0;
  font-weight: 700;
  box-shadow: 0 0 14px -7px #f09819;
  background-image: linear-gradient(
    45deg,
    #ffdf00 0%,
    #f5bf03 51%,
    #d3af37 100%
  );
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &::before {
    content: "<< ";
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 1200px) {
    right: 45%;
    top: 0;
  }
`;
const RSVPForm = ({ GuestNames }) => {
  const { t } = useTranslation();
  // State to manage attendance for each guest
  const [attendance, setAttendance] = useState({});
  const [dishSelections, setDishSelections] = useState({});
  const [currentGuest, setCurrentGuest] = useState(GuestNames[0]);
  const [showAttendanceError, setShowAttendanceError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    initializeAttendance();
    initializeDishSelections();
  }, []);
  // Initialize attendance state for each guest
  const initializeAttendance = () => {
    const initialAttendance = {};
    GuestNames.forEach((name) => {
      initialAttendance[name] = ""; // Can be 'attending', 'not_attending', or ''
    });
    setAttendance(initialAttendance);
  };
  const initializeDishSelections = () => {
    const initialDishSelections = {};
    GuestNames.forEach((name) => {
      initialDishSelections[name] = {
        entree: "",
        mainCourse: "",
      };
    });
    setDishSelections(initialDishSelections);
  };
  // Handle attendance selection
  const handleAttendance = (name, status) => {
    const updatedAttendance = { ...attendance };

    // Toggle attendance status
    if (updatedAttendance[name] === status) {
      updatedAttendance[name] = "";
    } else {
      updatedAttendance[name] = status;
    }

    // Ensure mutual exclusivity
    if (status === "attending") {
      updatedAttendance[name] = "attending";
      updatedAttendance[name] !== "not_attending";
    } else if (status === "not_attending") {
      updatedAttendance[name] = "not_attending";
      updatedAttendance[name] !== "attending";
    }

    setAttendance(updatedAttendance);
  };
  const allGuestsAttended = () => {
    return GuestNames.every(
      (name) =>
        attendance[name] === "attending" || attendance[name] === "not_attending"
    );
  };
  const handleDishSelection = (name, dishType, dish) => {
    setDishSelections((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [dishType]: dish,
      },
    }));
  };
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step === 4 && !allGuestsAttended()) {
      setShowAttendanceError(true); // Display error if attendance is incomplete
    } else {
      setShowAttendanceError(false); // Reset error state if attendance is complete
      setStep(step + 1); // Proceed to the next step
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  const handleDishSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if all attending guests have selected their dishes
      const attendingGuests = Object.entries(attendance)
        .filter(([, status]) => status === "attending")
        .map(([name]) => name);

      const allSelected = attendingGuests.every((name) => {
        return dishSelections[name]?.entree && dishSelections[name]?.mainCourse;
      });

      if (!allSelected) {
        setError(
          "Please choose dishes for all attending guests before submitting."
        );
        return;
      }

      // Prepare RSVP data for Firestore
      const rsvpData = GuestNames.map((name) => ({
        name,
        attending: attendance[name],
        entree: dishSelections[name]?.entree,
        mainCourse: dishSelections[name]?.mainCourse,
      }));

      //  // Fetch the document containing the guests array
      //  const querySnapshot = await getDocs(collection(db, "rsvps"));
      //  querySnapshot.forEach(async (doc) => {
      //    const docData = doc.data();
      //    const existingGuests = docData.guests;

      //    // Update guests array based on rsvpData
      //    const updatedGuests = existingGuests.map((guest) => {
      //      const updatedGuestData = rsvpData.find((data) => data.name === guest.name);
      //      if (updatedGuestData) {
      //        return {
      //          ...guest,
      //          attending: updatedGuestData.attending,
      //          entree: updatedGuestData.entree,
      //          mainCourse: updatedGuestData.mainCourse,
      //        };
      //      }
      //      return guest;
      //    });

      //    // Update the Firestore document with the modified guests array
      //    await updateDoc(doc.ref, {
      //      guests: updatedGuests
      //    });
      //  });
      // Add new RSVP data to Firestore
      await addDoc(collection(db, "rsvps"), {
        guests: rsvpData,
      });
      // Navigate based on attending status
      if (attendingGuests.length > 0) {
        navigate("/thankYou");
      } else {
        navigate("/WeWillMissYou");
      }
    } catch (error) {
      console.error("Error adding document:", error);
      setError("An error occurred while submitting. Please try again.");
    }
  };
  // const handleDishSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const rsvpData = GuestNames.map((name) => ({
  //       name,
  //       attending: attendance[name],
  //       entree: dishSelections[name]?.entree,
  //       mainCourse: dishSelections[name]?.mainCourse,
  //     }));

  //     await addDoc(collection(db, "rsvps"), {
  //       guests: rsvpData,
  //     });

  //     const attendingGuests = Object.entries(attendance)
  //       .filter(([, status]) => status === "attending")
  //       .map(([name]) => name);

  //     if (attendingGuests.length > 0) {
  //       // history.push('/food-selection');
  //       navigate("/thankYou");
  //       // handleNextStep
  //     } else {
  //       // history.push('/we-will-miss-you');
  //       navigate("/WeWillMissYou");
  //     }
  //   } catch (error) {
  //     console.error("Error adding document:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const batch = [];
      GuestNames.forEach((name) => {
        if (attendance[name] !== "") {
          batch.push({
            name,
            attending: attendance[name],
          });
        }
      });

      // Assuming "rsvps" is your Firestore collection
      const rsvpsCollection = collection(db, "rsvps");

      // Batch write to Firestore
      await Promise.all(batch.map((data) => addDoc(rsvpsCollection, data)));

      // Redirect to login page after successful submission
      navigate("/login"); // Adjust path as needed
    } catch (error) {
      console.error("Error adding documents: ", error);
    }
  };
  const isGuestCompleted = (name) => {
    return (
      attendance[name] === "attending" &&
      dishSelections[name]?.entree &&
      dishSelections[name]?.mainCourse
    );
  };
  return (
    <Container>
      <BgContainer />
      <ConfettiEffect />
      <GlitterEffect numGlitters={10} />
      <StyledContainer>
        {step > 1 && <StyledButton onClick={handlePrevStep}></StyledButton>}
        {/* <h1>We welcome you to our Signing Ceremony!</h1> */}
        {step === 1 && (
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <InvitationLetter GuestNames={GuestNames} />
          </div>
        )}
        {step === 2 && (
          <div>
            <h1>{t("Venue")}</h1>
            <p>
              {t("Our venue is")}{" "}
              <strong>{t("SEEDS Restaurant & Lounge.")}</strong>
              {"SEEDS Restaurant & Lounge."} <br></br>
              {t(
                "Located at the intersection of U Htun Nyein St & Kan Yeik Thar St. Near Inya Lake Hotel"
              )}
            </p>
            <GoogleMapsEmbed />
          </div>
        )}
        {step === 3 && (
          <div style={{ marginBottom: "40px" }}>
            <DressCodeSection />
          </div>
        )}
        {step === 4 && (
          <div>
            <h2>{t("RSVP")}</h2>
            <p>{t("Who is coming:")}</p>
            <Flexdiv>
              {GuestNames.map((name, index) => (
                <Form key={index}>
                  {/* <div
                    
                    style={{
                      // width: "20%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      border: "1px solid grey",
                      borderRadius: "15px",
                      margin: "20px auto",
                      padding: "20px",
                    }}
                  > */}
                  <input
                    style={{
                      background: "none",
                      width: "100%",
                      border: "none",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      color: "white",
                      margin: "20px",
                    }}
                    id={`name_${index}`}
                    label={`Name ${index + 1}`}
                    type="text"
                    value={name}
                    readOnly
                  />
                  <div>
                    {/* <Label htmlFor={`attending_${index}`}>Attending:</Label> */}
                    <StyledButtonRadio
                      id={`attending_${index}`}
                      selected={attendance[name] === "attending"}
                      onClick={() => handleAttendance(name, "attending")}
                    >
                      {t("Attending")}
                    </StyledButtonRadio>
                  </div>
                  <div>
                    {/* <Label htmlFor={`not_attending_${index}`}>
                        Not Attending:
                      </Label> */}
                    <StyledButtonRadio
                      id={`not_attending_${index}`}
                      selected={attendance[name] === "not_attending"}
                      onClick={() => handleAttendance(name, "not_attending")}
                    >
                      {t("Not Attending")}
                    </StyledButtonRadio>
                  </div>
                  <div></div>
                  {/* </div> */}
                </Form>
              ))}
              {/* <StyledButtonWithIcon type="submit">Submit</StyledButtonWithIcon> */}
            </Flexdiv>

            {showAttendanceError && (
              <p style={{ color: "red" }}>
                {t("Please select attendance status for all guests.")}
              </p>
            )}
          </div>
        )}
        {step === 5 && (
          <Form onSubmit={handleDishSubmit}>
            <Tabs>
              {GuestNames.filter(
                (name) => attendance[name] === "attending"
              ).map((name) => (
                <Tab
                  key={name}
                  active={currentGuest === name}
                  completed={isGuestCompleted(name)}
                  onClick={() => setCurrentGuest(name)}
                >
                  {name}
                </Tab>
              ))}
            </Tabs>

            <div>
              <h2>{currentGuest}</h2>

              <h3>Entree</h3>
              <div>
                <StyledButtonRadio
                  selected={
                    dishSelections[currentGuest]?.entree === "Green mango salad"
                  }
                  onClick={() =>
                    handleDishSelection(
                      currentGuest,
                      "entree",
                      "Green mango salad"
                    )
                  }
                >
                  {t("Green mango salad")}
                </StyledButtonRadio>
                <StyledButtonRadio
                  selected={
                    dishSelections[currentGuest]?.entree === "Pumpkin soup"
                  }
                  onClick={() =>
                    handleDishSelection(currentGuest, "entree", "Pumpkin soup")
                  }
                >
                  {t("Pumpkin soup")}
                </StyledButtonRadio>
              </div>

              <h3>Main Course</h3>
              <div>
                <StyledButtonRadio
                  selected={
                    dishSelections[currentGuest]?.mainCourse ===
                    "Duck agnolotti"
                  }
                  onClick={() =>
                    handleDishSelection(
                      currentGuest,
                      "mainCourse",
                      "Duck agnolotti"
                    )
                  }
                >
                  {t("Duck agnolotti")}
                </StyledButtonRadio>
                <StyledButtonRadio
                  selected={
                    dishSelections[currentGuest]?.mainCourse === "Seabass"
                  }
                  onClick={() =>
                    handleDishSelection(currentGuest, "mainCourse", "Seabass")
                  }
                >
                  {t("Seabass")}
                </StyledButtonRadio>
              </div>
            </div>

            <StyledButtonWithIcon type="submit">
              {t("Submit")}
            </StyledButtonWithIcon>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
        )}
        {step < 5 ? (
          <StyledButtonWithIcon type="button" onClick={handleNextStep}>
            {t("Next")}
          </StyledButtonWithIcon>
        ) : (
          <></>
        )}
      </StyledContainer>
    </Container>
  );
};

export default RSVPForm;
