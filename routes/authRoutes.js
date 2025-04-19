const express = require("express");//handles login and registration
const {
  registerUser,
  userLogin,
  userChangePassword,
} = require("../controllers/authControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.put("/change-password", authMiddleware, userChangePassword);

module.exports = router;
