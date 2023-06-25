import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// components
import Login from "./components/Login/Login"; // Login Page
import Admin from "./components/Admin/Layout/Admin"; // Admin Header
import AddCandidate from "./components/Admin/Add/AddCandidate"; // To add candidate
import AddVoter from "./components/Admin/Add/AddVoter"; // To add voter
import ShowCandidate from "./components/Admin/Show/ShowCandidate"; // To show candidate
import ShowVoter from "./components/Admin/Show/ShowVoter"; // To show voter
import Voter from "./components/Voter/Layout/Voter"; // Voter Header
import Profile from "./components/Voter/Vote/Profile"; // To show Profile
import Vote from "./components/Voter/Vote/Vote"; // To Vote

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add_candidate" element={<AddCandidate />} />
          <Route path="/admin/add_voter" element={<AddVoter />} />
          <Route path="/admin/show_candidate" element={<ShowCandidate />} />
          <Route path="/admin/show_voter" element={<ShowVoter />} />
          <Route path="/voter" element={<Voter />} />
          <Route path="/voter/profile" element={<Profile />} />
          <Route path="/voter/vote" element={<Vote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
