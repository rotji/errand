const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Duplicate email detected",
        details: err.keyValue,
      });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to register user", details: err.message });
  }
};

// Subscribe to a plan
exports.subscribePlan = async (req, res) => {
  try {
    const { userId } = req.params;
    const { plan, tasks, expiryDate, cost } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.subscription.plan = plan;
    user.subscription.tasksLeft = tasks;
    user.subscription.expiryDate = expiryDate;

    user.transactions.push({
      plan,
      amount: cost,
      paymentMethod: 'Credit Card', // For simplicity, hardcoding payment method
      details: { tasksCompleted: 0, transportCharges: 0, platformCharges: cost },
    });

    await user.save();
    res.json({ message: 'Subscription updated', subscription: user.subscription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Complete a task and deduct costs
exports.completeTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const { transportCost, platformCharge } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const task = user.tasks.id(taskId);
    if (!task || task.status === 'completed') return res.status(400).json({ message: 'Task not found or already completed' });

    task.status = 'completed';
    task.transportCost = transportCost;
    task.completionDate = new Date();

    user.subscription.tasksLeft -= 1;

    const totalCharge = platformCharge + transportCost;

    user.transactions.push({
      plan: user.subscription.plan,
      amount: totalCharge,
      paymentMethod: 'Deduct from subscription',
      details: {
        tasksCompleted: 1,
        transportCharges: transportCost,
        platformCharges: platformCharge,
      },
    });

    await user.save();
    res.json({ message: 'Task completed', task, remainingTasks: user.subscription.tasksLeft });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// New: Track Task Creators
exports.trackTaskCreators = async (req, res) => {
  try {
    const { userId, taskId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const task = user.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const creator = task.createdBy; // Assuming `createdBy` is a field in the task schema
    if (!creator) return res.status(404).json({ message: 'Creator information not available' });

    res.json({
      message: 'Task creator retrieved successfully',
      creator,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
