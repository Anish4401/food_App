const { verifyToken } = require("../Config/jwtProvider");
const UserService = require("../Services/User.Service");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(405).json({ message: "You are not authenticated /Or no token provided" });
    }

    const userId = verifyToken(token);
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await UserService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error); // Log the error
    return res.status(401).json({ message: "Authentication failed" });
  }
};