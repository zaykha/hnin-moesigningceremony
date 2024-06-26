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
import ProgressBarComponent from "./ProgressBarComponent";

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingText = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
`;

const ProgressBar = styled.div`
  width: 50%;
  height: 20px;
  background-color: #ccc;
  margin-bottom: 10px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #4caf50;
`;

const Percentage = styled.p`
  font-size: 18px;
  font-weight: bold;
`;
const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 2rem;
`;
function App() {
  const [GuestNames, setGuestNames] = useState([]);
  const [AlreadyFilled, setAlreadyFilled] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = GuestNames.length > 0 || AlreadyFilled.length > 0;
  useEffect(() => {
    const preloadAssets = async () => {
      const assets = [
        "./assets/selectLanguage1.jpg",
        "./assets/Login.jpg",
        "./assets/bg1.jpg",
      ];
    
      let loadedCount = 0;
    
      try {
        const responses = await Promise.all(
          assets.map((asset) => fetch(asset, { mode: 'no-cors' }))
        );
    
        await Promise.all(
          responses.map((response) => {
            if (response.ok) {
              loadedCount++;
              const newProgress = Math.floor((loadedCount / assets.length) * 100);
              setProgress(newProgress);
            } else {
              console.error(`Failed to fetch: ${response.url}`);
            }
          })
        );
    
        // Set loading to false once all assets are loaded
        setLoading(false);
      } catch (error) {
        console.error("Error preloading assets:", error);
        setLoading(false); // Handle error state or retry logic if needed
      }
    };
    
    preloadAssets();
  }, []);
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
  return loading ? (
    <ProgressBarComponent progress={progress} />
  ) : (
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
