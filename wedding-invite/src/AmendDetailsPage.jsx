import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Replace with your Firestore configuration
import styled from "styled-components";
import bgmobile from "./assets/bg1.jpg";
import StyledButtonWithIcon from "./IconButton";
import { useTranslation } from "react-i18next";
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
  &:hover {
    background-color: #858181;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;
const AmendDetailsPage = ({ AlreadyFilled }) => {
    const { t } = useTranslation();
  const [guestData, setGuestData] = useState(null);
    const navigate=useNavigate();
  useEffect(() => {
    // console.log(AlreadyFilled);
    // const fetchGuestData = async () => {
    //   try {
    //     const docRef = doc(db, 'rsvps', GuestNames[0]);
    //     const docSnap = await getDoc(docRef);

    //     if (docSnap.exists()) {
    //       setGuestData(docSnap.data());
    //     } else {
    //       console.log('No such document!');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching document:', error);
    //   }
    // };

    // fetchGuestData();
  }, []);

  if (!AlreadyFilled) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <StyledContainer>
        <h1>{t("It looks like you have already filled in the details.")}
        </h1>
        <h3>{t("Do you need to amend details?")}</h3>
        <StyledTable>
          <TableHead>
            <TableHeadRow>
              <TableHeader>{t("Name")}</TableHeader>
              <TableHeader>{t("Attending Status")}</TableHeader>
              <TableHeader>{t("Dish Entree")}</TableHeader>
              <TableHeader>{t("Dish Main")}</TableHeader>
              <TableHeader>{t("Notes")}</TableHeader>
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {AlreadyFilled?.map((guest, index) => (
              <TableRow key={index}>
                <TableCell>{guest.name}</TableCell>
                <TableCell>{guest.attending}</TableCell>
                <TableCell>{guest.entree}</TableCell>
                <TableCell>{guest.mainCourse}</TableCell>
                <TableCell>{guest.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
        <h4>If you wish to make changes, please contact Us</h4>
        {/* <StyledButtonWithIcon onClick={() => navigate('/RSVPForm')}>
          {t("Edit Details")}
        </StyledButtonWithIcon> */}
      </StyledContainer>
    </Container>
  );
};

export default AmendDetailsPage;
