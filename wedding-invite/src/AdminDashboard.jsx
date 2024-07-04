import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Make sure to import your firebase config
import bgmobile from "./assets/bg1.jpg";
import styled from "styled-components";
import CountdownTimer from "./CountdownTimer";
import RSVPStatistics from "./RSVPStats";
import guests from "./guests.json";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
  justify-content: flex-start;
  /* marginTop: 30px; */
  background: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* backdropFilter: blur(5px); */
  /* -webkit-backdrop-filter: blur(5px); */
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 999;
  @media screen and (max-width: 1200px) {
    width: 90%;
    padding: 1.1rem;
  }
`;
const StyledTableContainer = styled.div`
  width: 100%;
  max-height: 400px; /* Fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  margin: 20px 0;

  @media screen and (max-width: 768px) {
    max-height: 300px; /* Adjust height for mobile */
    font-size: 0.8rem; /* Smaller font size for mobile */
    margin: 10px 0;
  }
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  @media screen and (max-width: 768px) {
    margin: 10px 0;
  }
`;

const TableHead = styled.thead`
  background-color: #ffc30b;
  color: white;
`;

const TableHeadRow = styled.tr`
  border-bottom: 2px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    padding: 5px 15px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  //   &:nth-child(even) {
  //     background-color: #f2f2f2;
  //   }
  background-color: ${({ bgColor }) => bgColor};
  &:hover {
    background-color: #858181;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  @media screen and (max-width: 768px) {
    padding: 5px 10px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  @media screen and (max-width: 768px) {
    margin: 5px 0px;
  }
`;

const ToggleButton = styled.button`
  background-color: ${({ active }) => (active ? "#f09819" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #f09819;
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    margin: 0px 5px;
  }
`;

const colors = [
  "rgba(255, 99, 132, 0.3)",
  "rgba(54, 162, 235, 0.3)",
  "rgba(255, 206, 86, 0.3)",
  "rgba(75, 192, 192, 0.3)",
  "rgba(153, 102, 255, 0.3)",
  "rgba(255, 159, 64, 0.3)",
  "rgba(199, 199, 199, 0.3)",
  "rgba(83, 51, 237, 0.3)",
  "rgba(153, 204, 50, 0.3)",
  "rgba(255, 102, 255, 0.3)",
];
const FamilyContainer = styled.div`
  background-color: ${({ index }) => colors[index % colors.length]};
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;

  h3 {
    margin-top: 0;
  }
`;
const AdminDashboard = () => {
  const [guestData, setGuestData] = useState([]);
  const [missingGuests, setMissingGuests] = useState([]);
  const [view, setView] = useState("attending");
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "rsvps"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      // console.log(data)
      // const flattenedData = data.flatMap((item) =>
      //   item.guests.map((guest) => ({
      //     ...guest,
      //     // Attach the document ID for reference if needed
      //   }))
      // );
      const flattenedData = data.flatMap((item) =>
        item.guests.map((guest) => guest.name)
      );
      const missingGuestList = guests.filter(
        (localGuest) =>
          !localGuest.guestNames.every((name) => flattenedData.includes(name))
      );

      setMissingGuests(missingGuestList);
      setGuestData(data);
    };

    fetchData();
  }, []);
  const colors = [
    "rgba(255, 99, 71, 0.3)", // Tomato
    "rgba(135, 206, 235, 0.3)", // SkyBlue
    "rgba(255, 165, 0, 0.3)", // Orange
    "rgba(144, 238, 144, 0.3)", // LightGreen
    "rgba(255, 182, 193, 0.3)", // LightPink
    "rgba(173, 216, 230, 0.3)", // LightBlue
    "rgba(255, 105, 180, 0.3)", // HotPink
    "rgba(240, 230, 140, 0.3)", // Khaki
    "rgba(221, 160, 221, 0.3)", // Plum
    "rgba(64, 224, 208, 0.3)", // Turquoise
  ];
  const weddingStartDate = "2024-07-07T11:00:00";
  const weddingEndDate = "2024-07-07T13:00:00";
  return (
    <Container>
      <BgContainer />
      <StyledContainer>
        <h1>Admin Dashboard</h1>
        <CountdownTimer startDate={weddingStartDate} endDate={weddingEndDate} />
        <RSVPStatistics />
        <ButtonContainer>
          <ToggleButton
            active={view === "attending"}
            onClick={() => setView("attending")}
          >
            Attending
          </ToggleButton>
          <ToggleButton
            active={view === "pending"}
            onClick={() => setView("pending")}
          >
            Pending
          </ToggleButton>
        </ButtonContainer>
        {view === "pending" && (
          <StyledTableContainer>
            <StyledTable>
              <TableHead>
                <TableHeadRow>
                  <TableHeader>Username</TableHeader>
                  <TableHeader>Families</TableHeader>
                </TableHeadRow>
              </TableHead>

              <tbody>
                {missingGuests.map((family, index) => (
                  <TableRow key={index} index={index}>
                    <TableCell>{family.username}</TableCell>
                    <TableCell>
                      {family.guestNames.map((name, idx) => (
                        <li key={idx}>{name}</li>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </StyledTable>
          </StyledTableContainer>
        )}
        {view === "attending" && (
          <StyledTableContainer>
            <StyledTable>
              <TableHead>
                <TableHeadRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Attending</TableHeader>
                  <TableHeader>Dish Entree</TableHeader>
                  <TableHeader>Dish Main</TableHeader>
                  {/* <TableHeader>Notes</TableHeader> */}
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {/* {guestData?.map((guest, index) => (
            <TableRow key={index} bgColor={colors[index % colors.length]}>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.attending}</TableCell>
              <TableCell>{guest.entree}</TableCell>
              <TableCell>{guest.mainCourse}</TableCell>
              <TableCell>{guest.notes}</TableCell>
            </TableRow>
          ))} */}
                {guestData.map((guestGroup, groupIndex) =>
                  guestGroup.guests.map((guest, index) => (
                    <TableRow
                      key={index}
                      bgColor={colors[groupIndex % colors.length]}
                    >
                      <TableCell>{guest.name}</TableCell>
                      <TableCell>{guest.attending}</TableCell>
                      <TableCell>{guest.entree}</TableCell>
                      <TableCell>{guest.mainCourse}</TableCell>
                      {/* <TableCell>{guest.notes}</TableCell> */}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </StyledTable>
          </StyledTableContainer>
        )}
      </StyledContainer>
    </Container>
  );
};

export default AdminDashboard;
