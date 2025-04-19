const express = require("express");//handles CRUD
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllUsers);//admin only
router.get("/:id", authMiddleware, getSingleUser);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteUser);//admin only

module.exports = router;
