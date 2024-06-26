import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Replace with your Firestore configuration
import styled from "styled-components";
import bgmobile from "./assets/bg1.jpg";
import StyledButtonWithIcon from "./IconButton";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
const Container = styled.div`
  width: 100%;
  height: 100vh; /* Use vh instead of svh for better support */
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
  @media screen and (max-width: 786px) {
  justify-content: flex-start;
    
  }
`;

const StyledContainer = styled.div`
  width: 90vw;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 999;

  @media screen and (max-width: 1200px) {
    width: 90vw;
    padding: 1.1rem;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* Allow horizontal scrolling on small screens */
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
  &:hover {
    background-color: #858181;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;
const Card = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const CardItem = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #000;

  & > span {
    font-weight: bold;
  }
`;
const AmendDetailsPage = ({ AlreadyFilled }) => {
  const { t } = useTranslation();
  const [guestData, setGuestData] = useState(null);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  if (!AlreadyFilled) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <StyledContainer>
        <h1>{t("It looks like you have already filled in the details.")}</h1>
        <h3>{t("Do you need to amend details?")}</h3>
        {isDesktop ? (
          <TableWrapper>
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
          </TableWrapper>
        ) : (
          AlreadyFilled?.map((guest, index) => (
            <Card key={index}>
              <CardItem>
                <span>{t("Name")}:</span> {guest.name}
              </CardItem>
              <CardItem>
                <span>{t("Attending Status")}:</span> {guest.attending}
              </CardItem>
              <CardItem>
                <span>{t("Dish Entree")}:</span> {guest.entree}
              </CardItem>
              <CardItem>
                <span>{t("Dish Main")}:</span> {guest.mainCourse}
              </CardItem>
              <CardItem>
                <span>{t("Notes")}:</span> {guest.notes}
              </CardItem>
            </Card>
          ))
        )}
        <h4>If you wish to make changes, please contact Us</h4>
        {/* <StyledButtonWithIcon onClick={() => navigate('/RSVPForm')}>
          {t("Edit Details")}
        </StyledButtonWithIcon> */}
      </StyledContainer>
    </Container>
  );
};

export default AmendDetailsPage;
