import React from "react";
import TaskManagement from "../components/AgentDashboard/TaskManagement";
import TransactionHistory from "../components/AgentDashboard/TransactionHistory";
import PerformanceMetrics from "../components/AgentDashboard/PerformanceMetrics";
import AccountManagement from "../components/AgentDashboard/AccountManagement";
import Support from "../components/AgentDashboard/Support";
import styles from "./AgentDashboard.module.css";

const AgentDashboard = () => {
  return (
    <div className={styles.agentDashboard}>
      <h1 className={styles.title}>Agent Dashboard</h1>

      <section className={styles.section}>
        <TaskManagement />
      </section>

      <section className={styles.section}>
        <TransactionHistory />
      </section>

      <section className={styles.section}>
        <PerformanceMetrics />
      </section>

      {/* Provide placeholder props to prevent errors */}
      <section className={styles.section}>
        <AccountManagement
          user={{ name: "Guest" }} // Default user
          profile={{
            name: "Guest Name",
            email: "guest@example.com",
            phone: "000-000-0000",
          }}
          onUpdateProfile={() => console.log("Profile updated (placeholder)")}
          onChangePassword={() => console.log("Password changed (placeholder)")}
        />
      </section>

      <section className={styles.section}>
        <Support />
      </section>
    </div>
  );
};

export default AgentDashboard;
