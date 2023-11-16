import { Link } from "react-router-dom";
import "./Home.css"; // CSS file for Home component
import logo from "/super-leo-lig-logo.png"; // Update the path to your logo image

const Home = ({}) => {
  return (
    <div className=" ">
      {/* <h1 className="text-5xl tracking-tighter">Welcome to Super Leo Lig</h1>
      <img src={logo} alt="Super Leo Lig Logo" className="home-logo" /> */}

      <section className="relative flex items-center w-full h-full bg-white ">
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl">
          <div className="relative flex-col items-start m-auto align-middle">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
              <div className="relative items-center gap-12 m-auto lg:inline-flex md:order-first">
                <div className="max-w-xl text-center lg:text-left">
                  <div>
                    <p className="text-2xl font-medium tracking-tight text-black sm:text-4xl">
                      Welcome to Super Leo Lig!{" "}
                    </p>
                    <p className="max-w-xl mt-4 text-base tracking-tight text-gray-600">
                      Dive into a unique football manager game crafted on Aleo.
                      This blend of blockchain and zero-knowledge proofs ensures
                      secure, strategic gameplay. Manage your dream team in a
                      decentralized space – our modest contribution to changing
                      the game. Thanks for exploring with us!
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row lg:justify-start">
                    <Link
                      to="/create-game"
                      className="items-center justify-center w-full px-6 py-2.5  text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black"
                    >
                      Start Playing
                    </Link>
                    <Link
                      to="/games"
                      className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600"
                    >
                      Explore more &nbsp; →
                    </Link>
                  </div>
                </div>
              </div>
              <div className="order-first block w-full mt-12 aspect-square lg:mt-0">
                <img
                  className="object-cover object-center w-full mx-auto bg-black lg:ml-auto"
                  alt="logo"
                  src={logo}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
