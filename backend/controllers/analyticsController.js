const User = require("../models/User"); // Replace with your actual user model
const Agent = require("../models/Agent"); // Replace with your actual agent model
const Task = require("../models/Task"); // Replace with your actual task model

exports.getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsersToday = await User.countDocuments({ lastActive: { $gte: new Date().setHours(0, 0, 0, 0) } });

        const totalAgents = await Agent.countDocuments({ verified: true });
        const tasksCompletedToday = await Task.countDocuments({ completedAt: { $gte: new Date().setHours(0, 0, 0, 0) } });

        const pendingTasks = await Task.countDocuments({ status: "pending" });
        const completedTasks = await Task.countDocuments({ status: "completed" });

        // Example for performance metrics
        const totalTaskCompletionTime = await Task.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, avgTime: { $avg: "$completionTime" } } },
        ]);

        const successRate = completedTasks / (pendingTasks + completedTasks) * 100;

        res.json({
            totalUsers,
            activeUsersToday,
            totalAgents,
            tasksCompletedToday,
            pendingTasks,
            completedTasks,
            averageCompletionTime: totalTaskCompletionTime[0]?.avgTime || 0,
            successRate: successRate.toFixed(2),
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: "Failed to fetch analytics data." });
    }
};
