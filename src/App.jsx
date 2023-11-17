// App.jsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateGame from "./CreateGame";
import Games from "./Games";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Navbar from "./Navbar";

import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";
import React, { useMemo } from "react";
import { SupabaseProvider } from "./contexts/SupabaseContext";

// require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");

const App = () => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );
  console.log("🚀 ~ file: App.jsx:31 ~ App ~ wallets:", wallets);

  return (
    <main className="w-screen h-screen bg-white lg:overflow-y-hidden">
      <SupabaseProvider>
        <WalletProvider
          wallets={wallets}
          decryptPermission={DecryptPermission.UponRequest}
          network={WalletAdapterNetwork.Localnet}
          autoConnect
        >
          <WalletModalProvider>
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
                  <Route path="/game-room/:id" element={<CreateGame />} />
                  {/* Add other routes as needed */}
                </Routes>
              </div>
            </Router>
          </WalletModalProvider>
        </WalletProvider>
      </SupabaseProvider>
    </main>
  );
};

export default App;
