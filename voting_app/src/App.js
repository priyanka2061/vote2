import "./index.css";
// import { Link, NavLink } from "react-router-dom";
import { Route, BrowserRouter } from "react-router-dom";
// components
import Login from "./components/Login"; // Login Page
import Admin from "./components/Admin"; // Admin Page
import AddCandidate from "./components/Add/AddCandidate"; // To add candidate
import AddVoter from "./components/Add/AddVoter"; // To add voter
import ShowCandidate from "./components/Show/ShowCandidate"; // To show candidate
import ShowVoter from "./components/Show/ShowVoter"; // To show voter
import Voter from "./components/Voter"; // Voter Page

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin/add_candidate" component={AddCandidate} />
        <Route path="/admin/add_voter" component={AddVoter} />
        <Route path="/admin/show_candidate" component={ShowCandidate} />
        <Route path="/admin/show_voter" component={ShowVoter} />
        <Route path="/voter" component={Voter} />
      </BrowserRouter>
    </div>
  );
}

export default App;
