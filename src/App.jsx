import React, { createContext } from "react"; // Added createContext
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import AgentVerification from "./pages/AgentVerification";
import AgentsList from "./pages/AgentsList";
import TasksList from "./pages/TasksList";
import UsersList from "./pages/UsersList"; // Fixed typo in UsersList import
import NotFound from "./pages/NotFound";
import RequestTask from "./pages/RequestTask";
import FindAgent from "./pages/FindAgent";
import AgentProfile from "./pages/AgentProfile";
import AgentCard from "./components/AgentCard";
import TaskForm from "./components/TaskForm";
import AgentVerificationForm from "./components/AgentVerificationForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import AuthForm from "./components/AuthForm";
import "./index.css"; // Ensure global styles are included
import UserDashboard from "./pages/UserDashboard";
import AgentDashboard from "./pages/AgentDashboard";

// Create API context
export const APIContext = createContext();

const App = () => {
  // Retrieve email from localStorage
  const userEmail = localStorage.getItem("email");

  // API Base URL
  const apiBaseURL = "http://localhost:5000";

  return (
    <APIContext.Provider value={apiBaseURL}> {/* Provide API base URL */}
      <ErrorBoundary> {/* Wrap the entire app in the ErrorBoundary */}
        <Router>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                {/* Main Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/agent-verification" element={<AgentVerification />} />
                <Route path="/agents" element={<AgentsList />} />
                <Route path="/tasks" element={<TasksList userEmail={userEmail} />} /> {/* Pass email */}
                <Route path="/users" element={<UsersList />} />
                <Route path="/agent-dashboard" element={<AgentDashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<AuthForm />} />
                <Route path="/user-dashboard" element={<UserDashboard userEmail={userEmail} />} /> {/* Pass email */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />

                <Route path="/request-task" element={<RequestTask />} />
                <Route path="/find-agent" element={<FindAgent />} />
                <Route path="/agent-profile" element={<AgentProfile />} />
                <Route
                  path="/agent-card"
                  element={<AgentCard name="Sample Agent" phone="123-456-7890" verified={true} />}
                />
                <Route
                  path="/task-form"
                  element={<TaskForm onSubmit={(data) => console.log("Task Submitted:", data)} />}
                />
                <Route
                  path="/agent-verification-form"
                  element={<AgentVerificationForm onVerify={(phone) => console.log("Verification for:", phone)} />}
                />

                {/* Fallback Route for Undefined Paths */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ErrorBoundary>
    </APIContext.Provider>
  );
};

export default App;
