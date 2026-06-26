const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");


router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});
module.exports = router;