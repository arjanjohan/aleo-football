// Navbar.jsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Make sure this is correctly importing your CSS
import logo from "/logo_2.png"; // Update the path to your logo image

const Navbar = () => {
  return (
    <nav className=" w-screen z-10 flex bg-black justify-between items-center py-3 px-6">
      <div>
        <Link to="/" className="">
          {/* <Button variant="default">Home</Button> */}
          <img src={logo} alt="logo" className="w-16 h-16" />
        </Link>
      </div>
      <div>
        <Link
          to="/games"
          // className={buttonVariants({ variant: "outline", size: "lg" })}
          className=""
        >
          <Button variant="primary">Games</Button>
          {/* Games */}
        </Link>
        <Link to="/leaderboard" className="">
          <Button size="lg">Leaderboard</Button>
          <Link to="/create-game">
            <Button variant="secondary" className="rounded-lg">
              Create Game
            </Button>
          </Link>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
