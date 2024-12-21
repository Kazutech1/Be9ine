import User from "../models/userModel.js"; // Ensure this points to your User schema

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude sensitive data like passwords

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile retrieved successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profile", error });
  }
};


export const updateProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
  
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
  
      // Update fields only if they are provided in the request body
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      // Save updated user data
      const updatedUser = await user.save();
  
      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating profile", error });
    }
  };