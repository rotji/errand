const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false }, // Optional for registration/login
    verified: { type: Boolean, default: false }, // Defaults to false for unverified agents
    location: {
        lat: { type: Number, required: false }, // Optional for registration/login
        lng: { type: Number, required: false }, // Optional for registration/login
    },
}, { timestamps: true });

module.exports = mongoose.model("Agent", agentSchema);
