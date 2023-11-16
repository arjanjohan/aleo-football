// App.jsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateGame from "./CreateGame";
import Games from "./Games";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div className="overflow-y-hidden">
      <Router>
        <div>
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/games" element={<Games />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
