const Agent = require("../models/Agent"); // Ensure you import the correct Agent model

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
            password, // Store password as plain text (since this is a prototype)
            location, // Optional, leave it if your model supports it
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
        // Check if agent already exists
        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(400).json({ error: "Agent with this email already exists" });
        }

        const newAgent = new Agent({
            name,
            email,
            password, // Store password as plain text (since this is a prototype)
            location, // Optional, leave it if your model supports it
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

    // Ensure latitude and longitude are provided
    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    try {
        const agents = await Agent.find();

        const agentsWithDistance = agents
            .filter(agent => agent.location && agent.location.lat && agent.location.lng) // Ensure agents have valid locations
            .map((agent) => {
                const distance = Math.sqrt(
                    Math.pow(agent.location.lat - parseFloat(lat), 2) +
                    Math.pow(agent.location.lng - parseFloat(lng), 2)
                );
                return { ...agent.toObject(), distance };
            });

        // Sort agents by distance
        const sortedAgents = agentsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedAgents);
    } catch (error) {
        console.error("Error finding nearby agents:", error);
        res.status(500).json({ error: "Failed to find nearby agents." });
    }
};
