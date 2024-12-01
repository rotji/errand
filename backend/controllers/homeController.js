exports.getHome = (req, res) => {
  res.status(200).json({ message: "Welcome to the Home Route" });
};
