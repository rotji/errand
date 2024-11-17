import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AgentVerification from "./pages/AgentVerification"; // Corrected import
import AgentsList from "./components/AgentsList"; // If this is correctly under components
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css"; // Ensure this is included for global styles

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/agent-verification" element={<AgentVerification />} /> {/* Added Route */}
            <Route path="/agents-list" element={<AgentsList />} /> {/* Added Route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
