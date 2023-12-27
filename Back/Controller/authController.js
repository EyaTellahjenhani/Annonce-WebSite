const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  findUserByEmail,
  insertUser,
  generateResetToken,
  resetUserPassword,
} = require("../Models/authModels");
const sendEmail = require("../utils/sendEmail");

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await findUserByEmail(email);
    if (userExist) {
      let isMatch = await bcrypt.compare(password, userExist[0].Password);
      if (isMatch) {
        const token = jwt.sign(
          { id: userExist[0].UserID },
          process.env.JWT_SECRET,
        );
        res.cookie("token", token, {
          httpOnly: true,
        });
        res
          .status(200)
          .json({ message: "Utilisateur connecté avec succes", token });
      } else {
        res.status(404).json({ message: "Mot de passe incorrect" });
      }
    } else {
      res.status(404).json({ message: "Utilisateur n'existe pas" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Login error ",
      error: error.message,
    });
  }
};

exports.SignUp = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  if (firstName && lastName && email && password && phone) {
    try {
      const userExist = await findUserByEmail(email);
      if (userExist) {
        res.json("Email allready exist");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const results = await insertUser(
          firstName,
          lastName,
          email,
          hashedPassword,
          phone
        );
        if (results) {
          res.json("Regestred successfully");
        } else {
          res.json("Failed to register");
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Error during login");
    }
  } else {
    res.json("Please enter all fields");
  }
};

exports.SignOut = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Déconnecté avec succès" });
};

exports.ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await findUserByEmail(email);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and store reset token
    const resetToken = await generateResetToken(email);

    // Send reset password email
    if (resetToken) {
      const resetPasswordUrl = `http://${req.get(
        "host"
      )}/password/reset/${resetToken}`;

      await sendEmail({
        email: email,
        subject: "Password Reset Link",
        message: `<b>Your password reset link is:</b> <a href="${resetPasswordUrl}">${resetPasswordUrl}<a>`,
      });
      res.json({ message: "Reset password email sent", resetToken });
    } else {
      res.json({ message: "Failed to send reset password email" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await resetUserPassword(resetToken, hashedPassword);
    if (user) {
      res.json({ message: "Password updated successfully" });
    } else {
      res.json({ message: "Failed to update password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
