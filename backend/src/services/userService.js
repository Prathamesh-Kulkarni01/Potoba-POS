const User = require("../models/User");
const { generateToken } = require("../utils/auth");
const { hashPassword } = require("../utils/password");

const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = new User({
    ...userData,
    password: await hashPassword(userData.password),
  });

  await user.save();
  return { message: "User registered successfully" };
};

const loginUser = async (email, password, role) => {
  const user = await User.findOne({ email, role });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      selectedRestaurant: user.selectedRestaurant,
    },
  };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("selectedRestaurant");

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateUserProfile = async (userId, updatedData) => {
  if (!userId || !updatedData) {

    throw new Error("Invalid input");
  }

  const allowedUpdates = Object.keys(updatedData).filter(
    (key) => !["password", "_id"].includes(key)
  );

  if (allowedUpdates.length === 0) {
    throw new Error("No valid fields to update");
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    throw new Error("Failed to update user profile");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
