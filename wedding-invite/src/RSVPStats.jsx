import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const RSVPStatistics = () => {
  const [totalGuests, setTotalGuests] = useState(0);
  const [attending, setAttending] = useState(0);
  const [notAttending, setNotAttending] = useState(0);

  useEffect(() => {
    const fetchRSVPData = async () => {
      const querySnapshot = await getDocs(collection(db, 'rsvps'));
      const data = querySnapshot.docs.map((doc) => doc.data());
      const flattenedData = data.flatMap((item) => item.guests);

      setTotalGuests(flattenedData.length);
      setAttending(flattenedData.filter((guest) => guest.attending === 'attending').length);
      setNotAttending(flattenedData.filter((guest) => guest.attending === 'not_attending').length);
    };

    fetchRSVPData();
  }, []);

  return (
    <StatisticsContainer>
      <Statistic>
        <strong>Total Guests:</strong> {totalGuests}
      </Statistic>
      <Statistic>
        <strong>Attending:</strong> {attending}
      </Statistic>
      <Statistic>
        <strong>Not Attending:</strong> {notAttending}
      </Statistic>
    </StatisticsContainer>
  );
};

export default RSVPStatistics;

const StatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  color: white;
  margin: 20px auto;
  @media screen and (max-width: 1200px) {
   padding:10px;
   font-size:0.9rem;
   margin: 10px auto;
  }
`;

const Statistic = styled.div`
  margin: 10px 0;
  font-size: 1rem;
`;
