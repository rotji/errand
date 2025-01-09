const Agent = require("../models/Agent");
const Task = require("../models/Task"); // Import the Task model for task-related operations

// Create Agent
exports.createAgent = async (req, res) => {
    const { name, email, password, location } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newAgent = new Agent({
            name,
            email,
            password, // Plain text for prototype purposes
            location,
        });

        await newAgent.save();

        res.status(201).json({
            message: "Agent created successfully",
            agent: newAgent,
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                error: "Duplicate field value",
                details: err.keyValue,
            });
        }
        console.error("Error creating agent:", err);
        res.status(500).json({ error: "Failed to create agent", details: err.message });
    }
};

// Register Agent
exports.registerAgent = async (req, res) => {
    const { name, email, password, location } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(400).json({ error: "Agent with this email already exists" });
        }

        const newAgent = new Agent({
            name,
            email,
            password, // Plain text for prototype purposes
            location,
        });

        await newAgent.save();

        res.status(201).json({
            message: "Agent registered successfully",
            agent: newAgent,
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                error: "Duplicate field value",
                details: err.keyValue,
            });
        }
        console.error("Error registering agent:", err);
        res.status(500).json({
            error: "Failed to register agent",
            details: err.message,
        });
    }
};

// Find Nearby Agents
exports.findNearbyAgents = async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    try {
        const agents = await Agent.find();

        const agentsWithDistance = agents
            .filter(agent => agent.location && agent.location.lat && agent.location.lng)
            .map((agent) => {
                const distance = Math.sqrt(
                    Math.pow(agent.location.lat - parseFloat(lat), 2) +
                    Math.pow(agent.location.lng - parseFloat(lng), 2)
                );
                return { ...agent.toObject(), distance };
            });

        const sortedAgents = agentsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedAgents);
    } catch (error) {
        console.error("Error finding nearby agents:", error);
        res.status(500).json({ error: "Failed to find nearby agents." });
    }
};

// Bid on a Task
exports.bidOnTask = async (req, res) => {
    const { taskId, agentId } = req.body;

    if (!taskId || !agentId) {
        return res.status(400).json({ error: "Task ID and Agent ID are required." });
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        const existingBid = task.bids.find((bid) => bid.agentId === agentId);
        if (existingBid) {
            return res.status(400).json({ error: "Agent has already bid on this task." });
        }

        task.bids.push({ agentId });
        await task.save();

        res.status(200).json({
            message: "Bid placed successfully.",
            task,
        });
    } catch (error) {
        console.error("Error placing bid:", error);
        res.status(500).json({ error: "Failed to place bid." });
    }
};

// Add or Update Tasks (New Function)
exports.addOrUpdateTask = async (req, res) => {
    const { agentId, task } = req.body;

    if (!agentId || !task) {
        return res.status(400).json({ error: "Agent ID and task details are required." });
    }

    try {
        const agent = await Agent.findById(agentId);
        if (!agent) {
            return res.status(404).json({ error: "Agent not found." });
        }

        agent.tasks.push(task);
        await agent.save();

        res.status(200).json({
            message: "Task added or updated successfully.",
            agent,
        });
    } catch (error) {
        console.error("Error adding or updating task:", error);
        res.status(500).json({ error: "Failed to add or update task." });
    }
};

// Fetch Transaction History (New Function)
exports.getTransactionHistory = async (req, res) => {
    const { agentId } = req.params;

    try {
        const agent = await Agent.findById(agentId);
        if (!agent) {
            return res.status(404).json({ error: "Agent not found." });
        }

        const transactions = agent.tasks.filter((task) => task.payment && task.payment.paid);
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        res.status(500).json({ error: "Failed to fetch transaction history." });
    }
};

// Raise Dispute (New Function)
exports.raiseDispute = async (req, res) => {
    const { agentId, taskId, description } = req.body;

    if (!agentId || !taskId || !description) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const agent = await Agent.findById(agentId);
        if (!agent) {
            return res.status(404).json({ error: "Agent not found." });
        }

        agent.disputes.push({ taskId, description });
        await agent.save();

        res.status(200).json({
            message: "Dispute raised successfully.",
        });
    } catch (error) {
        console.error("Error raising dispute:", error);
        res.status(500).json({ error: "Failed to raise dispute." });
    }
};
