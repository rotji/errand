import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Analytics.module.css";

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get("/api/analytics");
                setAnalytics(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching analytics:", err);
                setError("Failed to load analytics data.");
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return <div className={styles.analyticsContainer}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.analyticsContainer}>{error}</div>;
    }

    return (
        <div className={styles.analyticsContainer}>
            <h1 className={styles.title}>Project Analytics</h1>
            <div className={styles.section}>
                <h2 className={styles.subTitle}>User Statistics</h2>
                <p>Total Registered Users: {analytics.totalUsers}</p>
                <p>Active Users Today: {analytics.activeUsersToday}</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.subTitle}>Agent Statistics</h2>
                <p>Total Verified Agents: {analytics.totalAgents}</p>
                <p>Tasks Completed Today: {analytics.tasksCompletedToday}</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.subTitle}>Task Statistics</h2>
                <p>Pending Tasks: {analytics.pendingTasks}</p>
                <p>Completed Tasks: {analytics.completedTasks}</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.subTitle}>Performance</h2>
                <p>Average Task Completion Time: {analytics.averageCompletionTime} minutes</p>
                <p>Success Rate: {analytics.successRate}%</p>
            </div>
        </div>
    );
};

export default Analytics;
