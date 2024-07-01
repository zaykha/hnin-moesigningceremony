import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Make sure to import your firebase config
import bgmobile from "./assets/bg1.jpg";
import styled from "styled-components";
const Container = styled.div`
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
  @media screen and (max-width: 1200px) {
    width: 90%;
    padding: 1.1rem;
  }
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
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
`;
const AdminDashboard = () => {
  const [guestData, setGuestData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "rsvps"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      // console.log(data)
      const flattenedData = data.flatMap((item) =>
        item.guests.map((guest) => ({
          ...guest,
          // Attach the document ID for reference if needed
        }))
      );
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
  return (
    <Container>
      <StyledContainer>
        <h1>Admin Dashboard</h1>
        <StyledTable>
          <TableHead>
            <TableHeadRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Attending</TableHeader>
              <TableHeader>Dish Entree</TableHeader>
              <TableHeader>Dish Main</TableHeader>
              <TableHeader>Notes</TableHeader>
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
                  <TableCell>{guest.notes}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </StyledTable>
      </StyledContainer>
    </Container>
  );
};

export default AdminDashboard;
