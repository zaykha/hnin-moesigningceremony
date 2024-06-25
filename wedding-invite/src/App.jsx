import { useEffect, useState } from "react";

import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import LanguageSelection from "./LanguageSelection";
import Login from "./Login";
import RSVPForm from "./RSVPForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import WeWillMissYouPage from "./WeWillMissYouPage";
import AdminDashboard from "./AdminDashboard";
import ThankYouPage from "./ThankYouPage";
import AmendDetailsPage from "./AmendDetailsPage";

const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 2rem;
`;
function App() {
  const [GuestNames, setGuestNames] = useState([]);
  const [AlreadyFilled, setAlreadyFilled] = useState([]);
  const isLoggedIn = GuestNames.length > 0 || AlreadyFilled.length > 0;
  useEffect(() => {
    AOS.init({
      // Here you can add your AOS settings
      duration: 2000, // Duration of animations in milliseconds
      once: true, // Whether animation should happen only once - while scrolling down
      // ... other settings
    });
  }, []);
  useEffect(() => {
    // Redirect to root if not logged in or on refresh
    if (!isLoggedIn && window.location.pathname !== "/") {
      window.location.href = "/"; // Redirect to root
    }
  }, [GuestNames, AlreadyFilled]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguageSelection />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/amendDetailsPage"
          element={<AmendDetailsPage AlreadyFilled={AlreadyFilled} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setGuestNames={setGuestNames}
              setAlreadyFilled={setAlreadyFilled}
            />
          }
        />
        <Route
          path="/RSVPForm"
          element={<RSVPForm GuestNames={GuestNames} />}
        />
        <Route path="/thankYou" element={<ThankYouPage />} />
        <Route path="/WeWillMissYou" element={<WeWillMissYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
