// Navbar.jsx
import { buttonVariants } from "@/components/ui/button";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Make sure this is correctly importing your CSS
import logo from "/logo_2.png"; // Update the path to your logo image
const Navbar = () => {
  return (
    <nav className=" w-screen z-10 flex bg-black text-white justify-between items-center py-3 px-6">
      <div>
        <Link to="/" className="">
          {/* <Button variant="default">Home</Button> */}
          <img src={logo} alt="logo" className="w-16 h-16 " />
        </Link>
      </div>
      <div className="flex text-white  items-center ml-8">
        <Link
          to="/games"
          className={`text-white ${buttonVariants({
            variant: "link",
            size: "lg",
          })}`}
          // className=""
        >
          {/* <Button variant="link" size="lg" >
            Games
          </Button> */}
          Games
        </Link>
        <Link
          to="/leaderboard"
          className={`text-white ${buttonVariants({
            variant: "link",
            size: "lg",
          })}`}
          // className=""
        >
          Leaderboard
        </Link>
        <Link
          to="/create-game"
          className={`text-white ${buttonVariants({
            variant: "link",
            size: "lg",
          })}`}
          // className=""
        >
          Create Game
        </Link>
      </div>
      <WalletMultiButton className="bg-[#154bf9]" />
    </nav>
  );
};

export default Navbar;
